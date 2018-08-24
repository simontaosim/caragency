import React from 'react';
import { Button, Form, Segment, Popup, Dimmer, Loader } from 'semantic-ui-react'
import UserSessions from '../../layouts/UserSessions';
import { auth } from '../../services/wilddog';


const timeoutLength = 2500

class Regsiter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            passwordRepeat: '',
            password: '',
            pwdIsOpen: false,
            emailIsOpen: false,
            pwdErrMsg: "",
            emailErrMsg: '',
            loading: false,
        }
    }

    inputChanged = (obj) => {
      
       this.setState(obj);

    }
    handleOpen = (openFeild,msgFeild, msg) => {

        let obj = {};
        obj[openFeild] = true;
        obj[msgFeild] = msg;
        
        this.setState({...obj});
        obj[openFeild] = false;
        obj[msgFeild] = "";
        this.timeout = setTimeout(() => {
          this.setState({...obj})
        }, timeoutLength)
      }
    
    handleClose = () => {
    this.setState({ 
        pwdIsOpen: false,
        emailIsOpen: false,
        pwdErrMsg: "",
        emailErrMsg: '',
        auth: false,
    })
    clearTimeout(this.timeout)
    }    

   

    handleSubmit = (e) =>  {
        e.preventDefault();
        const  { password, passwordRepeat, email} = this.state;

        
        
        if(password !== passwordRepeat){
            this.handleOpen("pwdIsOpen","pwdErrMsg", "两次密码不一致")
            return false;
        }
        if(email === ''){
            this.handleOpen("emailIsOpen","emailErrMsg", "请填写您的邮箱")
            return false;
        }

        this.setState({
            loading: true,
        })
        auth.createUserWithEmailAndPassword(email, password).then(()=>{
            
            this.setState({
                loading: false,
            })
           if(auth.currentUser){
               
               console.log("注册成功");
               
           }
            
        }).catch( err => {
            
            if(err.toString().includes("The email address is already in use")){
                
                this.setState({
                    loading: false
                })
                this.handleOpen("emailIsOpen","emailErrMsg", "邮箱地址已经被占用")
            }
            
        });
        
    }



    

    render(){

        
        return (

            <UserSessions match={this.props.match}>
            <Form size='large' onSubmit={this.handleSubmit}>
            
            <Segment stacked>
                <Dimmer active={this.state.loading}>
                    <Loader indeterminate>注册中</Loader>
                </Dimmer>
                <Popup
                    trigger={ <Form.Input type="email" fluid icon='user' iconPosition='left' placeholder='输入邮箱' onChange={(e)=>this.inputChanged({email: e.target.value})} />}
                    content={this.state.emailErrMsg}
                    open={this.state.emailIsOpen}
                   
                    onClose={this.handleClose}
                    style={{
                        borderRadius: 0,
                        opacity: 0.7,
                        padding: '2em',
                        height: "auto"
                        
                    }}
                    inverted
                    position = "bottom center"
                />
               
                <Popup
                    trigger={<Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='密码' onChange={(e)=>this.inputChanged({password: e.target.value})}
                        type='password'
                        />}
                    content={this.state.pwdErrMsg}
                    open={this.state.pwdIsOpen}
                    
                    onClose={this.handleClose}
                    style={{
                        borderRadius: 0,
                        opacity: 0.7,
                        padding: '2em',
                        height: "auto"
                        
                    }}
                    inverted
                    position = "bottom center"
                />
                
                <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='重复您的密码' onChange={(e)=>this.inputChanged({passwordRepeat: e.target.value})}
                type='password'
                />

                <Button type='submit' color='teal' fluid size='large'>
                注册
                </Button>
            </Segment>
            </Form>
            </UserSessions>
                    
        )
    }
}

export default Regsiter