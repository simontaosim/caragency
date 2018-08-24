import React from 'react';
import { Grid, Header, Image, Message, Container, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
 
class UserSessions extends React.Component {
    render(){
       const {path} = this.props.match;
        
        return (

            <div className='login-form'>
            <Menu
                inverted
              size='large'
            >
            <Container>
                <Menu.Item as='a' href="/">
                  首页
                </Menu.Item>
                <Menu.Item as='a'>博客</Menu.Item>
                <Menu.Item as='a'>关于</Menu.Item>
                <Menu.Item as='a'>招聘</Menu.Item>
                
              </Container>
              </Menu>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    <Image src='http://react.semantic-ui.com/logo.png' />
                    {
                        path === "/login" && <span>&nbsp;登录您的账号</span>
                    }{
                        path === "/register" && <span>&nbsp;注册您的账号</span>
                     }
                    </Header>
                     {this.props.children}
                    <Message>
                    {
                        path === "/login" &&  <span>没有账号？ <Link to="/register">注册</Link></span>
                    }
                    {
                        path === "/register" &&  <span>已经有账号？ <Link to="/login">登录</Link></span>
                    }
                       
                    
                    </Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default UserSessions