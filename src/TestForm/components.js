import React from 'react'
import { Input, Select } from 'antd'
const Option = Select.Option
const { TextArea, Search } = Input
export default [
    {
        type: 'antd-input',
        render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
            return <Input value={curData} 
                {...config.customConfig} 
                onFocus={getFocus}
                onBlur={loseFocus}
                placeholder={config.placeholder ? config.placeholder : ''}
                style={{borderColor: !!error ? '#f5222d' : ''}}
                onChange={event => changeFn(event.target.value)} />
        }
    },
    {
        type: 'antd-select',
        render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
            return <Select value={curData} 
                {...config.customConfig} 
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
        type: 'antd-textarea',
        render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
            return <TextArea value={curData}
                rows={5} 
                onFocus={getFocus}
                placeholder={config.placeholder ? config.placeholder : ''}
                onBlur={loseFocus}
                style={{borderColor: !!error ? '#f5222d' : ''}}
                onChange={event => changeFn(event.target.value)} />
        }
    },
    {
        type: 'antd-search',
        render: (curData, config, {changeFn, changeDataFn, getFocus, loseFocus, error}) => {
            return <Search value={curData}  
            onFocus={getFocus}
            {...config.customConfig}
            onBlur={loseFocus}
            placeholder={config.placeholder ? config.placeholder : ''}
            style={{borderColor: !!error ? '#f5222d' : ''}}
            onChange={event => changeFn(event.target.value)} />
        }
    }
]