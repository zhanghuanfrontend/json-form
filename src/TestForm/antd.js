import React from 'react'
export default {
    formKey: 'paramAddFromAntd',
    data: {
        name: '',
        typeName: 'string',
        descr: '',
        validator: {
            type: 'enum',
            value: [
                {
                    name: '',
                    descr: ''
                }
            ]
        }
    },
    config: [
        {
            type: 'antd-input',
            dataKey: 'name',
            label: 'Param',
            placeholder: '请输入param',
            style: {
                wrap: {
                    display: 'inline-block',
                    width: 270,
                }
            },
            validate: ['required', /^[a-zA-Z_{}0-9]+$/g]
        },
        {
            type: 'antd-select',
            dataKey: 'typeName',
            options: ['string', 'integer', 'float'],
            validate: [
                {type: 'enum', enum: ['string'], message: '只能为string'}
            ],
            style: {
                wrap: {
                    display: 'inline-block',
                    width: 120,
                    marginLeft: 10,
                }
            },
        },
        {
            type: 'antd-textarea',
            dataKey: 'descr',
            label: 'Param含义',
            validate: ['required'],
            style: {
                wrap: {
                    width: 400,
                }
            },
        },
        {
            type: 'form_array',
            label: 'values',
            dataKey: 'validator.value',
            hideBtn: true,
            style: {
                wrap: {
                    width: 460,
                }
            },
            addItem: {
                name: '',
                descr: ''
            },
            children: [
                {
                    type: 'antd-input',
                    placeholder: 'value值',
                    dataKey: 'name',
                    style: {
                        wrap: {
                            width: 138,
                            marginRight: 10,
                            display: 'inline-block'
                        }
                    },
                    validate: ['required']
                },
                {
                    type: 'antd-input',
                    placeholder: 'value备注',
                    dataKey: 'descr',
                    style: {
                        wrap: {
                            width: 138,
                            display: 'inline-block'
                        }
                    }
                },
                {
                    type: 'container',
                    style: {
                        wrap: {
                            display: 'inline-block',
                            width: 74,
                        }
                    },
                    render: (curData, config, {changeFn, changeDataFn, getFocus, loseFocus, error}) => {
                        const parentData = config.parentData
                        const handleAddItem = () => {
                            parentData.push({
                                name: '',
                                descr: ''
                            })
                            changeDataFn(config.parentKey, parentData)
                        }
                        const handleSubItem = () => {
                            parentData.splice(config.index, 1)
                            changeDataFn(config.parentKey, parentData)
                        }
                        return <div className="operation-btn-area">
                            <span className="operation-btn" onClick={handleAddItem}>添加</span>
                            {
                                parentData.length > 1 &&
                                <span className="operation-btn" onClick={handleSubItem}>删除</span>
                            }
                        </div>
                    }
                }
            ]
        }
    ]
}