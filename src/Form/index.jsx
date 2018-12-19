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
            this.setState({data: {...this.state.data, ...cloneData(nextProps.config.data)}})
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
            this.originData = props.config.data
            let newData = {...cloneData(props.config.data), ...storeData}
            this.setState({data: newData}, () => {
                this.validator.refresh()
            })
        }   
    }
    // 单次修改数据的值
    modifyOnceValue = (keyList, value, stateData) => {
        const {data, assistData} = this.state
        const newData = cloneData(data)
        const newAssistData = cloneData(assistData)
        if(Array.isArray(keyList) && keyList.includes('assistData')){
            const assistKeyList = getAssistDataKey(keyList)
            const {dataWrap, lastKey} = getDataWrap(newAssistData, assistKeyList)
            dataWrap[lastKey] = value
            stateData.assistData = newAssistData
        }else{
            const {dataWrap, lastKey} = getDataWrap(newData, keyList)
            dataWrap[lastKey] = value
            stateData.data = newData
        }
    }
    // 修改表单数据
    modifyFn = (keyList, value, success) => {
        const {config} = this.props
        const stateData = {}
        if(Array.isArray(keyList) && keyList.every(
            item => item instanceof Object 
            && item.key)){
            keyList.forEach((item) => {
                if(item.key){
                    this.modifyOnceValue(item.key, item.value, stateData)
                }
            })
        }else{
            this.modifyOnceValue(keyList, value, stateData)
        }
        this.setState(stateData, () => {
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
                success(this.state.data)
            }
        })
    }
    // 判断是否实时提交
    realSubmit = (success, data) => {
        const {config} = this.props
        if(config.realTimeSubmit && this.submitFn && this.submitFn instanceof Function){
            this.submitFn(data)
        }
        if(success && success instanceof Function){
            success(data)
        }
    }
    // 修改表单的值
    modifyDataFn = (callback) => {
        if(callback && callback instanceof Function){
            callback(this.state.data, this.modifyKeyValue)
        }
    }
    // 修改key对应的值
    modifyKeyValue = (key, value, success) => {
        if(key){
            let curKeyList = []
            if(key.includes('.')){
                curKeyList = key.split('.')
            }else{
                curKeyList = [key]
            }
            this.modifyFn(curKeyList, value, (data) => {
                this.realSubmit(success, data)
            })
        }else{
            this.modifyAllData(data, (data) => {
                this.realSubmit(success, data)
            })
        }
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
                        const totalWrapStyle = (config.style || {}).wrap || {}
                        const itemWrapStyle = (item.style || {}).wrap || {}
                        const wrapStyle = {...totalWrapStyle, ...itemWrapStyle}
                        return <div className="form-item-wrap" key={idx} style={wrapStyle}>
                            <ValidItem error={errors[item.dataKey]}>
                                <FormItem 
                                    totalConfig={config}
                                    totalStyle={config.style}
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