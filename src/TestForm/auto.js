export default {
    formKey: 'paramAddForm',
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
            type: 'input',
            label: 'Param',
            dataKey: 'name',
            placeholder: '请输入param',
            style: {
                display: 'inline-block',
                width: 270,
            },
            validate: ['required', /^[a-zA-Z_{}0-9]+$/g]
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
        {
            type: 'form_array',
            label: 'values',
            dataKey: 'validator.value',
            style: {
                width: 460,
            },
            addItem: {
                name: '',
                descr: ''
            },
            children: [
                {
                    type: 'input',
                    placeholder: 'value值',
                    dataKey: 'name',
                    style: {
                        width: 138,
                        marginRight: 10,
                        display: 'inline-block'
                    },
                    validate: ['required']
                },
                {
                    type: 'input',
                    placeholder: 'value备注',
                    dataKey: 'descr',
                    style: {
                        width: 138,
                        display: 'inline-block'
                    }
                },
            ]
        }
    ]
}