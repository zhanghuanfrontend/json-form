import React from 'react'
import {Select } from 'antd'
const Option = Select.Option
export default {
    formKey: 'example-form',
    data: {
        name: '',
        descr: '',
        param: {
            name: '',
            descr: ''
        }
    },
    config: [
        {
            type: 'input',
            dataKey: 'name',
            placeholder: '请输入param',
            label: 'param',
            validate: ['required', (rules, value, callback) => {
                if(/^[a-zA-Z_{}0-9]+$/g.test(value)){
                    callback()
                }else{
                    callback('param格式不正确')
                }
            }],
            style: {
                display: 'inline-block',
                width: 270,
            },
        },
        {
            type: 'container',
            dataKey: 'descr',
            style: {
                display: 'inline-block',
                width: 100,
                margin: '0 15px'
            },
            options: ['string', 'integer', 'float'],
            render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
                return <Select value={curData} 
                    style={{width: '100%', height: 35}} 
                    onMouseEnter={getFocus}
                    onChange={(value) => changeFn(value, () => {
                        loseFocus()
                    })}>
                    {
                        config.options && config.options.map((item, idx) => <Option key={idx} value={item}>{item}</Option>)
                    }
                </Select>
            }
        },
        {
            type: 'container',
            dataKey: 'param',
            label: 'param综合',
            style: {
                width: 400,
            },
            render: (curData, config, {changeFn, changeDataFn, JSONForm}) => {
                return <div>
                    {
                        JSONForm([
                            {
                                type: 'input',
                                dataKey: 'name',
                                placeholder: '请输入param',
                                validate: ['required'],
                                preventSubmit: true,
                                style: {
                                    display: 'inline-block',
                                    width: 170,
                                },
                            },
                            {
                                type: 'container',
                                dataKey: 'descr',
                                style: {
                                    display: 'inline-block',
                                    width: 100,
                                    margin: '0 15px'
                                },
                                options: ['string', 'integer', 'float'],
                                render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
                                    return <Select value={curData} 
                                        style={{width: '100%', height: 35}} 
                                        onMouseEnter={getFocus}
                                        onChange={(value) => changeFn(value, () => {
                                            loseFocus()
                                        })}>
                                        {
                                            config.options && config.options.map((item, idx) => <Option key={idx} value={item}>{item}</Option>)
                                        }
                                    </Select>
                                }
                            },
                        ])
                    }
                </div>
            }
        }
    ]
}

