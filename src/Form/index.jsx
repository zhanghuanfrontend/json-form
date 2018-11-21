import React, {Component} from 'react'
import FormItem from './FormItem'
import PropTypes from 'prop-types'
import Validator, {ValidItem} from './Validator'
import {cloneData, getDataWrap, getAssistDataKey} from './utils/common'
import './form.less'

export default class From extends Component {
    static propTypes = {
        config: PropTypes.object
    }
    static defaultProps = {
        config: {
            data: {},
            config: []
        }
    }
    constructor(props){
        super(props)
        this.state = {
            data: cloneData(props.config.data) || {},
            assistData: cloneData(props.config.assistData) || {},
            errors: {},
        }
    }
    // 自定义组件存储
    static customComponents = []
    // 初始化自定义组件
    static createCustomComp = (customComp) => {
        if(customComp && Array.isArray(customComp)){
            customComp.forEach(item => {
                if(item.render && item.type && From.customComponents.every(child => child.type !== item.type)){
                    From.customComponents.push(item)
                }
            })
        }
    }
    componentDidMount(){
        this.getStoreData(this.props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.config && nextProps.config !== this.props.config){
            this.getStoreData(nextProps)
        }
    }
    // 读取缓存数据
    getStoreData = (props) => {
        const {config} = props
        if(config.formKey && typeof config.formKey === 'string'){
            const dataStr = window.localStorage.getItem(config.formKey)
            let storeData = {}
            try{
                storeData = JSON.parse(dataStr) || {}
            }catch(err){
                console.log(err)
            }
            // if(['{}', '[]'].includes(JSON.stringify(storeData))){
            //     return
            // }
            let newData = {...cloneData(props.config.data), ...storeData}
            this.setState({data: newData}, () => {
                this.validator.refresh()
            })
        }   
    }
    // 修改表单数据
    modifyFn = (keyList, value, success) => {
        const {data, assistData} = this.state
        const {config} = this.props
        const newData = cloneData(data)
        const newAssistData = cloneData(assistData)
        if(Array.isArray(keyList) && keyList.includes('assistData')){
            const assistKeyList = getAssistDataKey(keyList)
            const {dataWrap, lastKey} = getDataWrap(newAssistData, assistKeyList)
            dataWrap[lastKey] = value
        }else{
            const {dataWrap, lastKey} = getDataWrap(newData, keyList)
            dataWrap[lastKey] = value
        }
        this.setState({
            data: newData,
            assistData: newAssistData
        }, () => {
            if(config.formKey && typeof config.formKey === 'string'){
                window.localStorage.setItem(config.formKey, JSON.stringify(this.state.data))
            }   
            if(success && success instanceof Function){
                success(this.state.data)
            }
        })
    }
    // 整体替换表单的值
    modifyAllData = (data, success) => {
        const {config} = this.props
        this.setState({data,}, () => {
            this.validator.refresh()
            if(config.formKey && typeof config.formKey === 'string'){
                window.localStorage.setItem(config.formKey, JSON.stringify(this.state.data))
            }
            if(success && success instanceof Function){
                success()
            }
        })
    }
    // 获取表单的值
    getValue = (callback) => {
        this.validator.validate(this.state.data, undefined, () => {
            const {errors, data} = this.state
            if(callback && callback instanceof Function){
                callback(JSON.stringify(errors) === '{}', data)
            }
        })
    }
    // 注册表单的提交函数
    registerSubmit = (callback) => {
        this.submitFn = (data) => {
            this.validator.validate(data, undefined, () => {
                const {errors, data} = this.state
                if(callback && callback instanceof Function){
                    callback(JSON.stringify(errors) === '{}', data)
                }
            })
        }
    }
    // 表单失去焦点
    handleLoseFocusFn = (keyList) => {
        this.validator.validate(this.state.data, keyList)
    }
    // 表单获得焦点
    handleGetFocusFn = (keyList) => {
        const {errors} = this.state
        const keyStr = Array.isArray(keyList) ? keyList.join('.') : ''
        if(errors[keyStr]){
            errors[keyStr] = undefined
            this.setState({errors,})
        }
    }
    // 设置报错信息
    setErrors = (newError, callback) => {
        const {errors} = this.state
        this.setState({errors: {...errors, ...newError}}, () => {
            if(callback && callback instanceof Function){
                callback()
            }
        })
    }
    // 清空errors
    cancelErrors = (callback) => {
        this.setState({errors: {}}, () => {
            if(callback && callback instanceof Function){
                callback()
            }
        })
    }
    // 更新校验rules
    refreshValid = (keyList, itemConfig) => {
        if(!this.validator){
            setTimeout(() => {
                this.refreshValid(keyList, itemConfig)
            }, 10)
            return
        }
        this.validator.refreshValid(keyList, itemConfig)
    }
    render(){
        const {config} = this.props
        const {data, assistData, errors} = this.state
        return <div className={`configurable-form-area ${config.className ? config.className : ''}`}>
            <Validator config={config.config} 
                setErrors={this.setErrors} 
                cancelErrors={this.cancelErrors} 
                data={data} ref={ref => this.validator = ref}>
                {
                    Array.isArray(config.config) && config.config.map((item, idx) => {
                        return <div className="form-item-wrap" key={idx} style={item.style}>
                            <ValidItem error={errors[item.dataKey]}>
                                <FormItem 
                                    config={item} 
                                    data={data}
                                    assistData={assistData}
                                    modifyAllData={this.modifyAllData}
                                    modifyFn={this.modifyFn}
                                    submitFn={this.submitFn}
                                    refreshValid={this.refreshValid}
                                    loseFocusFn={this.handleLoseFocusFn}
                                    error={errors}
                                    getFocusFn={this.handleGetFocusFn}/>
                            </ValidItem>
                        </div>
                    })
                }
            </Validator>
        </div>
    }
}