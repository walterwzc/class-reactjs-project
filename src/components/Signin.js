import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class Signin extends Component {
    
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })

        fetch('/api/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.form.getFieldsValue())
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(result => {
                console.log(result.data.success);
                if (result.data.success) {
                    this.props.history.push('/form')
                }
            })
    }

    render() {

        console.log(this.props);

        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }]
                    })(
                        <Input
                            prefix={
                                <Icon type="user" style={{ fontSize: 13 }} />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon type="lock" style={{ fontSize: 13 }} />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(Signin)
