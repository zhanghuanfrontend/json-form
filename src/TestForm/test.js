import React from 'react'
import {Select } from 'antd'
const Option = Select.Option
export default {
    formKey: 'example-form',
    realTimeSubmit: true,
    data: {
        name: '',
        descr: '',
        param: {
            name: '',
            descr: ''
        },
        type: {
            name: ''
        },
        wrapTypeName: ''
    },
    config: [
        {
            type: 'antd-input',
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
            modifyDataFn: ({changeDataFn}, {parent, self, data}) => {
                // const curData = {...data, name: self.curData}
                // changeDataFn('', curData)
                changeDataFn([{
                    key: 'name',
                    value: self.curData
                }, {
                    key: 'param.name',
                    value: self.curData + 'r'
                }, {
                    key: 'assistData.test',
                    value: true
                }])
            },
            style: {
                wrap: {
                    width: 270,
                }
            },
        },
        {
            type: 'container',
            dataKey: 'descr',
            style: {
                wrap: {
                    width: 100,
                    margin: '0 15px'
                }
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
            label: 'param综合',
            dataKey: '',
            style: {
                wrap: {
                    width: 400
                },
                label: {
                    marginTop: -15
                }
            },
            render: (curData, config, {changeFn, changeDataFn, JSONForm}) => {
                return <div>
                    {
                        JSONForm([
                            {
                                type: 'antd-input',
                                dataKey: 'param.name',
                                placeholder: '请输入param',
                                validate: ['required'],
                                preventSubmit: true,
                                style: {
                                    wrap: {
                                        width: 170,
                                    }
                                },
                            },
                            {
                                type: 'container',
                                dataKey: 'param.descr',
                                style: {
                                    wrap: {
                                        width: 100,
                                        margin: '0 15px'
                                    }
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
        },
        {
            type: 'antd-search',
            dataKey: 'wrapTypeName',
            label: 'event事件',
            preventSubmit: true,
            customConfig: {
                enterButton: true,
                onSearch: () => {
                    window.JSONForm.modifyDataFn((data, modifyDataFn) => {
                        modifyDataFn('wrapTypeName', data.wrapTypeName)
                    })
                }
            },
            style: {
                display: 'inline-block',
                width: 350,
            }
        },
        {
            type: 'container',
            dataKey: 'type',
            render: (curData, config, {JSONForm}) => {
                return <div>
                    {
                        JSONForm([{
                            type: 'container',
                            dataKey: '',
                            render: (curData, config, {JSONForm}) => {
                                return <div>
                                    {
                                        JSONForm([{
                                            type: 'antd-input',
                                            label: '测试嵌套',
                                            dataKey: 'name'
                                        }])
                                    }
                                </div>
                            }
                        }])
                    }
                </div>
            }
        }
    ],
    style: {
        label: {
            textAlign: 'left',
            width: 100,
            paddingLeft: 22
        },
        wrap: {
            display: 'inline-block',
        }
    }
}

