import React from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react'
import UserSessions from '../../layouts/UserSessions';

class Login extends React.Component {
    componentDidMount(){
        let form = new window.AuthingForm({
            clientId: "5ba35d77349e2d0001a5c00f",
            secret: "97951a35b37bc2235fbab161293509a1",
            title: "巫力格格",
            hideOAuth: false,
          });
        form.on('login', function(user) {
            // 成功登录后的回调事件，参数 user 为用户数据
        });
        form.on('formClosed',  () => {
            this.props.history.push('/')
        });
    }
    render(){
        
        return (

            <div></div>
                    
        )
    }
}

export default Login