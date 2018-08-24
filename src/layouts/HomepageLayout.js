import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Grid,
  Dropdown
} from 'semantic-ui-react'
import HeadBanner from '../components/home/HeadBanner';
import { auth } from '../services/wilddog';
import {Link} from 'react-router-dom';
import Beian from '../beian.png'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

 const style = {
     color: "white",
 }

class DesktopContainer extends Component {
  state = {logined: false}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
        if(user){
            this.setState({
                logined: true,
            })
        }
      })
  }

  render() {
      console.log(this.state);
      
    const { children, match } = this.props
    const { fixed } = this.state
    
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: match.path==="/"? 700 : 0, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' href='/' active={match.path==='/'}>
                  首页
                </Menu.Item>
                <Menu.Item as='a' href="/blog"  active={match.path==='/blog'}>官方博客</Menu.Item>
                <Menu.Item as='a' href="/about"  active={match.path==='/about'}>关于</Menu.Item>
                <Menu.Item as='a' href="/career"  active={match.path==='/career'}>招聘</Menu.Item>
                {
                    this.state.logined?
                    <Menu.Item position='right'>
                    <Button as='a' href="/personal" inverted={!fixed}>
                      个人中心
                    </Button>
                    <Button as='a' href="/login" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                        安全退出
                    </Button>
                    
                  </Menu.Item> :
                  <Menu.Item position='right'>
                  <Button as='a' href="/login" inverted={!fixed}>
                    登录
                  </Button>
                  <Button as='a' href="/register" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    注册
                  </Button>
                </Menu.Item>

                }
                
              </Container>
            </Menu>
            {
                match.path === "/" && <HeadBanner />
            }
            
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children, match } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' href="/" active>
              首页
            </Menu.Item>
            <Menu.Item as='a' href="/blog">官方博客</Menu.Item>
            <Menu.Item as='a' href="/about">关于</Menu.Item>
            <Menu.Item as='a' href="/career">招聘</Menu.Item>
            <Menu.Item as='a' href="/login">登录</Menu.Item>
            <Menu.Item as='a' href="/register">注册</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: match.path==="/"? 350 : 0, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item>
                  <Dropdown text='选择城市'>
                    <Dropdown.Menu>
                      <Dropdown.Item text='成都' />
                      <Dropdown.Item text='北京' />
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' href="/about" inverted>
                     万车顺通
                    </Button>
                   
                  </Menu.Item>
                </Menu>
              </Container>
              {
                  match.path === "/" &&  <HeadBanner mobile />
              }
             
            </Segment>

            {children}
           
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Grid centered padded columns={4} inverted
         style={{textAlign: "center", position: "fixed", width: "100%", bottom: 0, color: 'black', backgroundColor: "rgba(0, 0, 0, 0.74)"}}>
          <Grid.Column style={{textAlign: 'center'}}>
          <Link to="/" style={style}>
           <Icon name='home' color='orange' /><br/><span style={{color: 'orange'}}>首页</span>
           </Link>
          </Grid.Column>
          <Grid.Column style={{textAlign: 'center'}}>
          <Link to="/blog" style={style}>
           <Icon name='users' /><br/>我的客户
          </Link>
          </Grid.Column>
          
          <Grid.Column style={{textAlign: 'center'}}>
          <Link to="/service" style={style}>
           <Icon name='servicestack' /><br/>客服中心
           </Link>
          </Grid.Column>
          <Grid.Column style={{textAlign: 'center'}}>
          <Link to="/my" style={style}>
           <Icon name='user'  /><br/>我的
           </Link>
          </Grid.Column>
        </Grid>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, match }) => (
  <div>
    <DesktopContainer match={match}>{children}</DesktopContainer>
    <MobileContainer match={match}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = ({children, match}) => (
  <ResponsiveContainer match={match}>
      {children}
      <div style={{width:"300px", margin:"0 auto", padding:"20px 0", textAlign: "center"}}>
	    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010402000596" style={{display:"inline-block", textDecoration:"none", height:"20px", lineHeight:"20px"}}>
        
        <p style={{height:"20px", lineHeight:"20px",margin: "0px 0px 0px 5px", color: "#939393"}}><img src={Beian} style={{float:"left"}}/>川公网安备 51010402000596号</p></a>
        
        <p style={{height:"20px", lineHeight:"20px",margin: "0px 0px 0px 5px", color: "#939393"}}>
            <a href="http://www.miitbeian.gov.cn/">蜀ICP备18022933号-1</a><br/>
            四川万车顺通汽车服务有限公司版权所有
        </p>
        <br/>
        <br/>
        <br/>
        <br/>
	 </div>
  </ResponsiveContainer>
)
export default HomepageLayout