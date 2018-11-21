# JSON表单
## 描述
JSON表单是一个基于React的抽象组件，它可以把JSON数据格式描述的表单转换成项目中的表单，它可以用简短的几行代码，快速的生成Form表单。
JSON表单的优点是：

 1. 可以快速构建出一个表单
 2. 表单的数据、逻辑、视图分离，方便抽离和进一步抽象
 3. 提供校验、自动缓存等额外功能，提升录入体验
 4. 可以跨项目的共用复杂的表单组件

## 原始表单的缺点
1：代码量庞大，开发效率低
每次开发一个表单页的时候，都需要重复编写表单组件及其交互事件的代码，这块代码重复编写且与主线业务逻辑无关，除此之外，表单的校验、缓存等额外功能，也需要不少的代码量，这样就造成了一个表单页的代码量庞大。

2：不便于抽离和进一步的抽象
在一个表单页内，往往会将表单数据、表单组件、控制逻辑杂糅在一起，当发现某一个子功能在很多场景下都需要用到的时候，想把该子功能拆分出来发现并不容易，因为逻辑、数据、视图的杂糅，导致想把子功能不受影响的剔除出来需要很仔细的检查，这样就导致功能的抽离和抽象的不便

3：维护成本高
这个和第二个问题是同样的原因，这也是我的亲身经历，当我在项目中想优化一个小功能的时候，发现不仅把之前的逻辑改没了，还引出了不少的bug，这导致在一个逻辑很复杂的表单里，维护变成了一件高危工作。

4：需要额外处理校验和缓存等功能
## 如何使用
其`github`地址为：[json_transform_form][1]。
### 依赖环境

 1. React  基于React
 2. async-validator  基于它做校验
### 安装
```
npm i json_transform_form --save
```
## 一个栗子
```
import Form from 'json_transform_form'
const config = {
    formKey: 'example-form',
    data: {
        name: '',
        descr: '',
        typeName: ''
    },
    config: [
        {
            type: 'input',
            dataKey: 'name',
            label: 'param',
            placeholder: '请输入param',
            validate: ['required', /^[a-zA-Z_{}0-9]+$/g],
            style: {
                display: 'inline-block',
                width: 270,
            },
        },
        {
            type: 'select',
            dataKey: 'typeName',
            options: ['string', 'integer', 'float'],
            style: {
                display: 'inline-block',
                width: 100,
                margin: '0 15px'
            },
            validate: [{type: 'required', message: 'param类型不能为空'}]
        },
        {
            type: 'textarea',
            dataKey: 'descr',
            placeholder: '请输入param含义',
            label: 'param含义',
            validate: ['required'],
            style: {
                width: 385,
            }
        },
    ]
}

<From ref={ref => this.FormWrap = ref} config={config}></From>
```
上面是用JSON描述的三个常用的表单组件组合成的表单，其效果图如下：
![图片描述][2]

## JSON表单的格式
```
{
    formKey: 'paramAddForm',
    data: {},
    config: []
}
```
| 属性 | 是否必传 | 说明 | 类型 | 默认值
| :---- | :----: | ---- | :----:| :----: |
| formKey | 否 | 用来自动缓存，localStorage的key，不传表示不自动缓存 | string | - |
| className | 否 | 用来添加一些自定义样式 | string | - |
| data | 是 | 表单的提交数据，有自动缓存和校验功能 | object | - |
| assisData | 否 | 用于表单控制逻辑的额外数据 | object | - |
| config | 是 | 组件配置，表单组件的配置 | Array | - |
| realTimeSubmit | 否 | 表单是否实时提交，一般用于筛选表单 | boolean | false |
## 表单组件的配置
```
{
    type: 'input',
    dataKey: 'name',
    label: 'param',
    validate: ['required'],
    style: {}
}
``` 
| 属性 | 是否必传 | 说明 | 类型 | 默认值 | 
| ---- | :---: | --- | :---: | :---: |
| type | 是 | 表单组件的类型，其值可以为: input、select、textarea、form_array、container和一些自定义表单组件 | string | - |
| dataKey | 否 | 指定表单组件值的key，可以为param.name.firstName形式 | string | - |
| label | 否 | 表单组件的label | string | - |
| placeholder | 否 | 表单组件的placeholder | string | - | 
| validate | 否 | 表单组件的校验规则 | Array | - | 
| style | 否 | 表单组件的布局样式 | string | - |
| options | 否 | 当表单组件为select时，需要传入的options | Array | - |
| render | 否 | 当type为container时，为自定义组件，render为渲染方法 | Function | - |
| preventSubmit | 否 | 当realTimeSubmit为true时，控制当前表单组件是否实时提交 | boolean | false |
| children | 否 | 当type为form_array时，children表示子组件配置列表 | Array | - |
| modifyDataFn | 否 | 当type为自定义组件时，且需要覆盖render方法中的提交数据方法，可以使用modifyDataFn来重新自定义提交数据 | Function | - |
### 关键字段解释
#### 1. type
type是用来唯一表示表单组件类型的字段，其中JSON表单提供了三种默认的表单组件：input、select、textarea，还有两种复杂类型的表单组件：form_array、container。

form_array表单组件表示其数据结构为Array，含有增加项删除项的复合表单组件，该表单组件的配置里多一个children的字段，里面是每一项里面的表单组件配置的集合，其表单组件的效果如下图所示：
![图片描述][3]

container是用来自定义表单的接口，具体用法参考下面具体的介绍。

#### 2. validate
validate是校验表单组件数据正确性的字段，其值为数组，里面的数组元素可以为String、object、RegExp、Function。

JSON表单采用的是`async-validator`异步处理校验，在JSON表单内部会将validate传入的校验关键字解析为`async-validator`的rules。所以validate数组元素如果为object的话，其内容就是`async-validator`的rules。
    1. 数组元素为string，其值可以为：
        string，值必须为string
        number，值必须为数字 
        required，值不能为空
        boolean，值必须为布尔值
        integer，值必须为整数形
        float，值必须为浮点型
        email，值必须为邮箱类型
    2. 数组元素为object，其值为rules：
        {type: 'enum', enum: ['1', '2'], message: '值不在确定范围内'}
    3. 数组元素为RegExp, validate: [/^[a-zA-Z_{}0-9]+$/g]
    4. 数组元素为Function， validate: [ (rules, value, callback) => {}]
    
#### 3. style
用来确定表单组件在表单内的布局样式，比如想让表单组件行内显示，且宽度为200，其style值如下：
```
{
    display: 'inline-block',
    width: 200
}
```
## container表单组件
container表单组件是用来自定义表单组件的，它主要的作用有以下几点：

 1. 添加表单组件库，例如Ant-Design
 2. 自定义表单组件，例如图片上传组件
 3. 用来构建复杂的表单组件
 4. 处理控制逻辑和联动逻辑
### 使用栗子
```
import { Input, Select } from 'antd'
const Option = Select.Option
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
```
container表单组件只是多一个render渲染方法，里面可以自定义表单组件的渲染内容，render方法提供如下参数：
    1. curData: 当前container组件的值，跟dataKey相关
    2. config: 当前container组件的配置
    3：{changeFn, changeDataFn, getFocus, loseFocus, error, JSONForm}
        changeFn, changDataFn是提交数据的方法，changeFn只能修改当前组件dataKey的值，changeDataFn可以修改data中任意字段的值，changeFn(value, [callback]), changeFn(dataKey, value, [callback])
        getFocus，loseFocus是自定义处理校验的字段，loseFocus是开始校验，getFocus是去掉校验的报错信息
        error是校验结果的报错信息
       JSONForm是在container中使用JSON表单的组件配置用来生成新的表单组件，意思里container中依然可以嵌套表单组件。

### 使用antd的组件库
JOSN表单只提供了input、select、textarea三种默认的表单组件，远远不够真实的项目中使用，所以我们可以将antd组件库中的组件封装到JSON表单中，这样我们就可以再项目中很快的使用antd中的组件。

antd-components.js
```
import React from 'react'
import { Input } from 'antd'
export default [
    {
        type: 'antd-input',
        render: (curData, config, {changeFn, getFocus, loseFocus, error}) => {
            return <Input value={curData}  
                onFocus={getFocus}
                onBlur={loseFocus}
                placeholder={config.placeholder ? config.placeholder : ''}
                style={{borderColor: !!error ? '#f5222d' : ''}}
                onChange={event => changeFn(event.target.value)} />
        }
    }
]
```
我们在antd-components.js文件中声明一个`antd-input`的自定义组件，然后在JSON表单中引入该自定义表单组件：

init.js
```
import Form from 'json_transform_form'
import components from './antd-components'
From.createCustomComp(components)

const config = {
    formKey: 'paramAddFromAntd',
    data: {
        name: '',
    },
    config: [
        {
            type: 'antd-input',
            dataKey: 'name',
            label: 'Param',
            placeholder: '请输入param',
            validate: ['required', /^[a-zA-Z_{}0-9]+$/g]
        }
    ]
}
<From ref={ref => this.FormWrap = ref} config={config}></From>
```
使用container来引入antd组件库，其原理就是通过container将antd组件封装成'antd-input'自定义组件，然后使用它，这种方式不仅可以用来封装组件库，还可以用来共享一些共用表单组件，可以将常用的复杂表单组件封装在一个共用文件里，然后在不同项目中引用，就可以跨项目共用表单组件。

在自定义组件中，如果需要自定义表单提交数据函数，但是又不能重写render方法以防覆盖原先的render方法，所以可以使用modifyDataFn方法来覆盖render中的提交数据部分。
```
modifyDataFn: ({changeFn, changeDataFn}, {parent, self}) => {
    let {parentData} = parent
    parentData = parentData.map(item => ({
        ...item,
        name: self.curData
    }))
    changeDataFn(parent.parentKey, parentData)
}
```
### 处理控制逻辑和联动逻辑
在JSON表单JSON配置中，有assistData的选填字段，该字段为JSON表单处理控制逻辑的额外数据，例如在表单内有一个刷新按钮，其实现代码如下：
```
{
    data: {},
    assistData: {
        refreshParam: false
    },
    config: [
        {
            type: 'container',
            dataKey: 'assistData.refreshParam',
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
    ]
}
```
注意： 如果要使用assistData中的数据，其dataKey必须以`assistData`开头，且必须使用`changeDataFn`自定义提交assistData数据。
### render方法内嵌套组件配置
```
{
    type: 'container',
    dataKey: 'param',
    render: (curData, config, {changeFn, changeDataFn, JSONForm}) => {
        return <div>
            {
                JSONForm([
                    {
                        type: 'input',
                        dataKey: 'name',
                        placeholder: '请输入param',
                        validate: ['required'],
                    }
                ])
            }
        </div>
    }
```
这样就可以在container内嵌套组件配置，实现更复杂的表单组件。
## JSON表单提交数据
### 非实时表单提交
非实时表单提交数据，就是在表单输入完毕后，点击提交按钮统一提交所有的数据，其提交的方式如下：
```
function handleClick() {
    this.FormRefs.getValue((valid, data) => {
        // valid 表示校验结果，false表示校验不通过
    })
}
```
### 实时表单提交
实时表单的提交首先需要注册提交函数：
```
componentDidMount(){
    this.FormRefs.registerSubmit((valid, data) => {
        console.log(valid, data)
    })
}
```
接着在配置里设置允许实时提交的字段：
```
{
    formKey: '',
    realTimeSubmit: true
}
```
如果需要在某些表单组件里自定义是否实时提交，需要在组件配置里设置阻止实时提交字段为true：
```
{
    dataKey: '',
    preventSubmit: true
}
```
## JSON表单的应用场景
### 表单分类
    a. 按复杂度分类
        1. 简单表单：表单组件为input、select、textarea等常见的几种，且表单组件之间逻辑独立
        2. 复杂表单：表单组件内容和交互复杂且相互之间存在复杂的逻辑
    其中复杂表单又可以分为：
        1. 联动表单，上一个表单组件会影响接下来表单的值
        2. 实时表单，表单组件的事件会触发表单的实时提交，例如筛选表单
        3. 富控制表单，表单内部含有很多的控制逻辑
JSON表单最适合的应用场景是简单表单，它可以用极少的代码，快速的构建出表单来，对于复杂类型的表单，JSON表单需要使用container来构建复杂的表单组件、处理复杂的控制逻辑，其代码量优势虽然并不明显，但是JSON表单可以使其代码清晰，将表单组件和表单逻辑彻底解耦，便于抽离和维护，便于共享常用组件，也带来不少的好处。

到目前为止，JSON表单适合大部分的表单应用场景。
### JSON表单解决的问题

 1. 减少了表单代码量，不需要重复的开发表单组件，只需要输入组件配置即可
 2. 将表单组件和数据解耦，便于子功能的拆分和常用组件的共享
 3. 简化了校验功能，只需要传入validate字段即可
 4. 添加了自动缓存功能
在我的项目，我尝试了使用原始表单和JSON表单两种方式来实现同一个表单页，原始表单我编写了600多行的代码，而在JSON表单中，只有不到150行。


  [1]: https://github.com/zhanghuanfrontend/json-form
  [2]: /img/bVbjKcz
  [3]: /img/bVbjKnH