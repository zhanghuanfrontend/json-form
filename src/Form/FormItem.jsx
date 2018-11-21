import React, {Component} from 'react'
import {getLastKeyValue, cloneData, getAssistDataKey} from './utils/common'
import Form from './index'
import {ValidItem} from './Validator'
import './form.less'

export default class FormItem extends Component {
    // 点击事件
    handleChange = (keyList, value, success, config, param) => {
        if(config && config.modifyDataFn && config.modifyDataFn instanceof Function){
            config.modifyDataFn({
                changeFn: (data, success) => {
                    this.modifyDataFn(keyList, data, config ,success)
                },
                changeDataFn: (key, data, success) => {
                    if(key){
                        let curKeyList = []
                        if(key.includes('.')){
                            curKeyList = key.split('.')
                        }else{
                            curKeyList = [key]
                        }
                        this.modifyDataFn(curKeyList, data, config, success)
                    }else{
                        this.props.modifyAllData(data, success)
                    }
                }
            }, param)
        }else{
            this.modifyDataFn(keyList, value, config, success)
        }
    }
    // 修改数据
    modifyDataFn = (keyList, value, config, success) => {
        const {submitFn, totalConfig} = this.props
        this.props.modifyFn(keyList, value, (data) => {
            if(totalConfig.realTimeSubmit && !config.preventSubmit && submitFn && submitFn instanceof Function){
                submitFn(data)
            }
            if(success && success instanceof Function){
                success(data)
            }
        })
    }
    // 失去焦点
    loseFocus = (keyList) => {
        this.props.loseFocusFn(keyList)
    }
    // 获得焦点
    getFocus = (keyList) => {
        this.props.getFocusFn(keyList)
    }
    // 添加item
    handleAddItem = (keyList, config) => {
        const {data} = this.props
        const {lastData} = getLastKeyValue(data, keyList)
        if(Array.isArray(lastData)){
            lastData.push(config.addItem)
        }
        this.props.modifyAllData(data)
    }
    // 删除item
    deleteItem = (keyList, idx) => {
        const {data} = this.props
        const {lastData} = getLastKeyValue(data, keyList)
        if(Array.isArray(lastData)){
            lastData.splice(idx, 1)
        }
        this.props.modifyAllData(data)
    }
    // 获取自定义的表单组件
    getCustomFormItem = (config, data, keyList = [], childConfig) => {
        const customComponents = Form.customComponents
        const isHasCustom = customComponents.find(item => item.type === config.type)
        if(isHasCustom){
            const newConfig = {...isHasCustom, ...config, type: 'container'}
            return this.getFormItem(newConfig, data, keyList, childConfig)
        }else{
            return this.getFormItem(config, data, keyList, childConfig)
        }
    }
    // 校验组件的配置
    validFormItemConfig = (config) => {
        //console.log(config)
    }
    // 获取默认的表单组件
    getFormItem = (config, data, keyList = [], childConfig = {}) => {
        const {error, assistData} = this.props
        const formType = config.type || 'input'
        this.validFormItemConfig(config)
        // 获取当前值
        let dataKey = config.dataKey, keys = [], curValue = data
        if(dataKey && dataKey.includes('.')){
            keys = dataKey.split('.')
            keys.forEach(key => {
                keyList.push(key)
                if(key && curValue){
                    curValue = curValue[key]
                }
            })
        }else {
            keyList.push(dataKey)
            curValue = curValue && curValue[dataKey]
        }
        if(Array.isArray(keyList) && keyList.includes('assistData')){
            const newKeyList = getAssistDataKey(keyList)
            const {lastData} = getLastKeyValue(assistData, newKeyList)
            curValue = lastData
        }
        const keyStr = Array.isArray(keyList) ? keyList.join('.') : config.dataKey
        const errorClassName = error[keyStr] ? 'error-style' : ''
        const formItems = {
            'input': <input 
                className={`input-component form-item ${errorClassName}`} 
                value={curValue} 
                placeholder={config.placeholder || ''}
                onFocus={() => this.getFocus(keyList)}
                onBlur={() => this.loseFocus(keyList)}
                onChange={(event) => this.handleChange(keyList, event.target.value, () => {}, config)}/>,
            'textarea': <textarea 
                className={`textarea-component form-item ${errorClassName}`}
                value={curValue} 
                placeholder={config.placeholder || ''}
                onBlur={() => this.loseFocus(keyList)}
                onFocus={() => this.getFocus(keyList)}
                onChange={(event) => this.handleChange(keyList, event.target.value, () => {}, config)} 
                ></textarea>,
            'select': <select 
                className={`select-component form-item ${errorClassName}`}
                value={curValue}
                onClick={() => this.getFocus(keyList)}
                onChange={(event) => {
                    this.handleChange(keyList, event.target.value, (data) => {
                        this.loseFocus(keyList)
                    }, config)
                }} >
                {
                    Array.isArray(config.options) && config.options.map((item, idx) => {
                        const label = typeof item === 'string' ? item : item.label
                        const value = typeof item === 'string' ? item : item.value
                        return <option key={idx} className="option-item" value={value}>{label}</option>
                    })
                }
            </select>,
            'form_array': <div className="form-list-area">
                {
                    Array.isArray(curValue) && curValue.map((group, groupIdx) => {
                        return <div key={groupIdx} className="form-list">
                            {
                                config.children && config.children.map((item, idx) => {
                                    const newKeyList = [...keyList, groupIdx]
                                    return <React.Fragment key={idx}>
                                        {this.getFormItemWrap(item, curValue[groupIdx], newKeyList, {
                                            childType: 'children',
                                            index: groupIdx,
                                            parentKey: config.dataKey,
                                            parentData: curValue,
                                            parentConfig: config
                                        })}
                                    </React.Fragment>
                                })
                            }
                            {
                                !config.hideBtn && 
                                <div className="operation-btn-area">
                                    {
                                        (groupIdx === curValue.length - 1) && 
                                        <span className="operation-btn" onClick={() => this.handleAddItem(keyList, config)}>添加</span>
                                    }
                                    {
                                        curValue.length > 1 &&
                                        <span className="operation-btn" onClick={() => this.deleteItem(keyList, groupIdx)}>删除</span>
                                    }
                                </div>
                            }
                        </div>
                    })
                }
            </div>,
            'container': <React.Fragment>
                {
                    config.render && config.render(curValue, {...config, ...childConfig}, {
                        changeFn: (data, success) => {
                            const param = {
                                parent: childConfig,
                                self: {
                                    ...config,
                                    curData: data,
                                    preData: curValue
                                }
                            }
                            this.handleChange(keyList, data ,success, config, param)
                        },
                        changeDataFn: (key, data, success) => {
                            const param = {
                                parent: childConfig,
                                self: {
                                    ...config,
                                    curData: data,
                                    preData: curValue
                                }
                            }
                            if(key){
                                let curKeyList = []
                                if(key.includes('.')){
                                    curKeyList = key.split('.')
                                }else{
                                    curKeyList = [key]
                                }
                                this.handleChange(curKeyList, data, success, config, param)
                            }else{
                                this.props.modifyAllData(data, success)
                            }
                        },
                        getFocus: () => {
                            this.getFocus(keyList)
                        },
                        loseFocus: () => {
                            this.loseFocus(keyList)
                        },
                        JSONForm: (configArray) => {
                            if(!configArray || 
                                !Array.isArray(configArray) || 
                                configArray.length === 0){
                                    return ''
                                }
                            return configArray.map((item, idx) => {
                                let newKeyList = cloneData(keyList)
                                if(item.dataKey && item.dataKey.includes('.')){
                                    newKeyList = newKeyList.concat(item.dataKey.split('.'))
                                }else if(item.dataKey){
                                    newKeyList.push(item.dataKey)
                                }
                                this.props.refreshValid(newKeyList, item)
                                return <React.Fragment key={idx}>
                                    {
                                        this.getFormItemWrap(item, curValue, cloneData(keyList), {
                                            childType: 'children',
                                            parentKey: config.dataKey,
                                            parentData: curValue,
                                            parentConfig: config
                                        })
                                    }
                                </React.Fragment>
                            })
                        },
                        error: error[keyStr],
                        assistData: this.props.assistData,
                        data: this.props.data,
                    })
                }
            </React.Fragment>
        }
        return formItems[formType] || formItems['input']
    }
    getFormItemWrap = (config, data, keyList, childConfig) => {
        const {error} = this.props
        const higherType = ['textarea', 'form_array']
        const childElement = <div className="form-group">
            {
                (config && config.label) && 
                <label className={higherType.includes(config.type) ? 'label higher' : 'label'}><span>{config.label || ''}</span>：</label>
            }
            {
                this.getCustomFormItem(config, data, keyList, childConfig)
            }
        </div>
        if(childConfig && childConfig.childType === 'children'){
            const keyStr = Array.isArray(keyList) ? keyList.join('.') : config.dataKey
            return  <div className="form-item-wrap" style={config.style}>
                <ValidItem error={error[keyStr]}>
                    {childElement}
                </ValidItem>
            </div>
        }
        return childElement
    }
    render(){
        const {config, data} = this.props
        const keyList = []
        return this.getFormItemWrap(config, data, keyList)
    }
}