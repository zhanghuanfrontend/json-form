import React from 'react'
import { Button, Popover, Icon, Checkbox } from 'antd'
import { checkTip, grayTip } from './utils/tip'
export default {
    formKey: 'add-param-json-from',
    className: 'add-param-form-class',
    data: {
        formData: [
            {
                name: '',
                descr: '',
                typeName: '',
                isRequired: false,
                isDimSplited: false,
            }
        ],
    },
    assistData: {
        refreshParam: false
    },
    config: [
        {
            type: 'form_array',
            dataKey: 'formData',
            hideBtn: true,
            addItem: {
                name: '',
                descr: '',
                typeName: '',
                isRequired: false,
                isDimSplited: false,
            },
            style: {
                width: 750,
            },
            children: [
                {
                    type: 'antd-input',
                    dataKey: 'name',
                    label: 'Param',
                    placeholder: '请输入param',
                    style: {
                        display: 'inline-block',
                        width: 270,
                    },
                    validate: ['required', /^[a-zA-Z_{}0-9]+$/g],
                    modifyDataFn: ({changeFn, changeDataFn}, {parent, self}) => {
                        let {parentData} = parent
                        parentData = parentData.map(item => ({
                            ...item,
                            name: self.curData
                        }))
                        changeDataFn(parent.parentKey, parentData)
                    }
                },
                {
                    type: 'container',
                    dataKey: 'assistData.refreshParam',
                    style: {
                        display: 'inline-block',
                        width: 28,
                        margin: '0 10px',
                        verticalAlign: 'middle'
                    },
                    render: (curData, config, {changeFn, changeDataFn}) => {
                        const handleClick = () => {
                            changeDataFn('assistData.refreshParam' ,true)
                            setTimeout(() => {
                                changeDataFn('assistData.refreshParam' ,false)
                            }, 1000 * 3)
                        }
                        return <React.Fragment>
                            {
                                config.index === config.parentData.length - 1 &&
                                <Popover placement="top" content="刷新param列表">
                                    <Button shape="circle" loading={curData} onClick={handleClick}>{!curData && <Icon type="reload" />}</Button>
                                </Popover>
                            }
                        </React.Fragment>
                    }
                },
                {
                    type: 'antd-select',
                    dataKey: 'typeName',
                    options: ['string', 'integer', 'float'],
                    validate: [
                        {type: 'enum', enum: ['string'], message: '只能为string'}
                    ],
                    style: {
                        display: 'inline-block',
                        width: 120,
                    },
                },
                {
                    type: 'container',
                    dataKey: 'isRequired',
                    style: {
                        display: 'inline-block',
                        width: 100,
                        marginLeft: 10,
                    },
                    render: (curData, config, {changeFn}) => {
                        return <Checkbox
                            checked = {curData}
                            onChange = {event => changeFn(event.target.checked)}>
                            <span style={{fontSize: 12}}>必传检测</span>
                            { checkTip }
                        </Checkbox>
                    }
                },
                {
                    type: 'container',
                    dataKey: 'isDimSplited',
                    style: {
                        display: 'inline-block',
                        width: 100,
                        marginLeft: 10,
                    },
                    render: (curData, config, {changeFn}) => {
                        return <Checkbox
                            checked = {curData}
                            onChange = {event => changeFn(event.target.checked)}>
                            <span style={{fontSize: 12, width: 48, display: 'inline-block', verticalAlign: 'middle'}}>灰度验证拆分维度</span>
                            { grayTip }
                        </Checkbox>
                    }
                },
                {
                    type: 'antd-textarea',
                    dataKey: 'descr',
                    label: 'Param含义',
                    validate: ['required'],
                    style: {
                        width: 400,
                    },
                },
                {
                    type: 'container',
                    style: {
                        width: '100%'
                    },
                    render: (curData, config, {changeFn, changeDataFn}) => {
                        const handleClick = () => {
                            const {parentData, parentConfig} = config
                            parentData.push(parentConfig.addItem)
                            changeDataFn(config.parentKey, parentData)
                        }
                        const handleSubClick = () => {
                            const {parentData} = config
                            parentData.splice(config.index, 1)
                            changeDataFn(config.parentKey, parentData)
                        }
                        return <React.Fragment>
                            {
                                config.index === config.parentData.length - 1 &&
                                <div className="lang-add-btn" onClick={handleClick}>+</div>
                            }
                            {
                                (config.parentData && config.parentData.length > 1) &&
                                <div className="sub-item-btn" onClick={handleSubClick}>
                                    <Icon type="delete" />
                                </div>
                            }
                        </React.Fragment>
                    }
                }
            ]
        }
    ]
}