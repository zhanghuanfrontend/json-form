import React, {Component} from 'react'
import { Tabs, Button } from 'antd'
import From from '../Form'
import autoConfig from './auto'
import antdConfig from './antd'
import exampleConfig from './test' 
import addParam from './addParam'
import './testForm.less'
import components from './components'
From.createCustomComp(components)
const TabPane = Tabs.TabPane

export default class TestForm extends Component {
    constructor(){
        super()
        this.state = {
            activeKey: '1',
            config: exampleConfig
        }
    }
    componentDidMount(){
        this.FormWrap.registerSubmit((valid, data) => {
            console.log(valid, data)
        })
    }
    componentWillReceiveProps(nextProps){
        if((nextProps.filterInfo.appId && nextProps.filterInfo !== this.props.filterInfo)
            || (nextProps.selectorInfo && nextProps.selectorInfo !== this.props.selectorInfo)){
        }
    }
    tabsChange = (value) => {
        let config
        switch(value){
            case '1':
                config = exampleConfig
                break
            case '2':
                config = autoConfig
                break
            case '3':
                config = antdConfig
                break
            case '4':
                config = addParam
                break
            default:
                config = exampleConfig
                break
        }
        this.setState({activeKey: value, config,})
    }
    render() {
        const {activeKey, config} = this.state
        let style = {}
        if(activeKey === '4'){
            style = {
                width: 750,
                border: 0,
                padding: 0
            }
        }
        return <div className="test-form-area-ig-mvp">
            <Tabs activeKey={activeKey} onChange={this.tabsChange}>
                <TabPane tab="简单表单" key="1"></TabPane>
                <TabPane tab="默认表单组件" key="2"></TabPane>
                <TabPane tab="Ant Design" key="3"></TabPane>
                <TabPane tab="实战栗子" key="4"></TabPane>
            </Tabs>
            <div className="form-area" style={style}>
                <From ref={ref => this.FormWrap = ref} config={config}></From>
                <Button type="primary" className="submit-btn" onClick={() => {
                    this.FormWrap.getValue((valid, data) => {
                        console.log(valid, data)
                    })
                }}>提交</Button>
            </div>
        </div>
    }
}