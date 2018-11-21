import React, {Component} from 'react'
import Schema from 'async-validator'
import {getLastKeyValue} from './utils/common'

const rulesString = [
    {type: 'string', msg: '必须为字符串'},
    {type: 'number', msg: '必须为数字'},
    {type: 'required', msg: '值不能为空'},
    {type: 'boolean', msg: '必须为bool值'},
    {type: 'integer', msg: '必须为整数型'},
    {type: 'float', msg: '必须为浮点型'},
    {type: 'enum', mag: '不在规定范围内'},
    {type: 'date', msg: '必须为日期类型'},
    {type: 'email', msg: '邮箱格式不正确'},
]
export default class Validator extends Component {
    constructor(props){
        super(props)
        this.state = {
            rules: {},
            validator: null,
        }
    }
    componentDidMount(){
        this.refresh(this.props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.config && nextProps.config !== this.props.config){
            this.refresh(nextProps)
        }
    }
    // 重新解析规则
    refresh = (props) => {
        const {config} = props || this.props
        const {rules} = this.state
        const newRules = this.getRules(config, props || this.props)
        this.setState({rules: {...rules, ...newRules}}, this.createValidator)
       
    }
    // 创建validator
    createValidator = () => {
        const {rules} = this.state
        const validator = new Schema(rules)
        this.setState({validator,})
    }
    // 更新规则
    refreshValid = (keyList, item) => {
        const {rules} = this.state
        if(Array.isArray(keyList) && Array.isArray(item.validate)){
            const valid = this.analyValidate(item)
            this.addDeepValidator(rules, keyList, valid)
        }
        this.setState({rules,}, this.createValidator)
    }
    // 解析出规则
    getRules = (config, props) => {
        if(!config || !Array.isArray(config)){
            return {}
        }
        let {rules} = this.state
        let keyList = []
        config.forEach(item => {
            if(item.dataKey && item.dataKey.includes('.')){
                keyList = item.dataKey.split('.')
            }else if(item.dataKey){
                keyList = [item.dataKey]
            }else{
                keyList = []
            }
            if(item.dataKey && item.validate && Array.isArray(item.validate)){
                const valid = this.analyValidate(item)
                this.addDeepValidator(rules, keyList, valid)
            }
            if(Array.isArray(item.children)){
                const {data} = props
                const subRules = this.getRules(item.children)
                const childRules = {
                    type: 'array',
                    fields: {}
                }
                const {lastData} = getLastKeyValue(data, keyList)
                if(lastData && Array.isArray(lastData)){
                    lastData.forEach((child, childIdx) => {
                        childRules.fields[childIdx] = {
                            type: 'object',
                            fields: {...subRules}
                        }
                    })
                }
                this.addDeepValidator(rules, keyList, childRules)
            }
        })
        return rules
    }
    // 解析validate字段
    analyValidate = (item) => {
        if(!item.validate || !Array.isArray(item.validate) || item.validate.length === 0){
            return []
        }
        const valid = []
        item.validate.forEach(child => {
            if(typeof child === 'string'){
                const rule = rulesString.find(subRule => subRule.type === child)
                if(rule){
                    valid.push({
                        type: rule.type,
                        required: rule.type === 'required',
                        message: `${item.label ? item.label : ''}${rule.msg}`,
                    })
                }
            }
            if(child instanceof Object && child.type){
                const rule = rulesString.find(subRule => subRule.type === child.type)
                if(rule){
                    valid.push({
                        type: rule.type,
                        required: rule.type === 'required',
                        message: `${item.label ? item.label : ''}${rule.msg}`,
                        ...child,
                    })
                }
            }
            // 正则表达式校验
            if(child instanceof RegExp){
                valid.push({
                    pattern: child,
                    message: `${item.label ? item.label : ''}格式不正确`
                })
            }
            if(child instanceof Function){
                valid.push({validator: child})
            }
        })
        return valid
    }
    // 深层解析添加validator
    addDeepValidator = (rules, keyList, valid) => {
        if(!rules || !rules instanceof Object || !Array.isArray(keyList) || keyList.length === 0){
            return
        }
        const len = keyList.length, lastKey = keyList[len - 1]
        let dataWrap = rules, preKey = keyList[0]
        for(let i = 1; i < len; i++){
            let key = keyList[i]
            if(!dataWrap[preKey] || !dataWrap[preKey].fields){
                dataWrap[preKey] = {
                    type: parseInt(key) == key ? 'array' : 'object',
                    fields: {}
                }
            }
            dataWrap = dataWrap[preKey].fields
            preKey = key
        }
        dataWrap[lastKey] = valid
    }
    validate = (data, keyList, callback) => {
        const {validator} = this.state
        if(!validator || !data){
            return
        }
        const options = {
            firstFields: Array.isArray(keyList) ? [keyList.join('.')] : true
        }
        validator.validate(data, options, (errors, fields) => {
            if(errors && fields){
                let errors = fields
                if(Array.isArray(keyList)){
                    let key = keyList.join('.')
                    errors = {
                        [key]: fields[key]
                    }
                }
                this.props.setErrors(errors, callback)
            }else{
                if(typeof keyList === 'undefined'){
                    this.props.cancelErrors(callback)
                }else{
                    if(callback && callback instanceof Function){
                        callback()
                    }
                }
            }
        })
    }
    render(){
        return <div className="Validator">
            {this.props.children}
        </div>
    }
}

export class ValidItem extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {error} = this.props
        return <div>
            {this.props.children}
            {
                (error && error.length > 0) &&  
                <p className="message-hint-area">{error[0].message}</p>
            }
        </div>
    }
}