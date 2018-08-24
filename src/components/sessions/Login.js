import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import UserSessions from '../../layouts/UserSessions';

class Login extends React.Component {
    render(){
        
        return (

            <UserSessions match={this.props.match}>
            <Form size='large'>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                />

                <Button color='teal' fluid size='large'>
                登录
                </Button>
            </Segment>
            </Form>
            </UserSessions>
                    
        )
    }
}

export default Login