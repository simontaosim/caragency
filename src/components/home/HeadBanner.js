import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Container,
    Header,
    Icon,
  } from 'semantic-ui-react'
import { head_banner_ref } from '../../services/wilddog';

// wilddogPromise(head_banner_ref, 'value').then(data => {
//     // const { title, subtitle} = data.val();
//     console.log("调用一次");
    
// }).catch(err => {
//     console.log(err);
    
// })

class HeadBanner extends React.Component{
    constructor(props){
        super(props);
        this.ref = head_banner_ref;
        this.state = {
            loading: true,
            title: '',
            subtitle: '',
            buttonText: ''
            
        };

    }

    componentDidMount(){
       
        this.ref.on('value', snapshot => {
            const {title, subtitle, buttonText} = snapshot.val();
            this.setState({
                loading: false,
                title,
                subtitle,
                buttonText
            })
            
        })
      
    }

    render(){
        const { title, subtitle, buttonText} = this.state;
        return (
            <Container text>
                <Header
                as='h1'
                content={title}
                inverted
                style={{
                    fontSize: this.props.mobile ? '2em' : '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: this.props.mobile ? '1.5em' : '3em',
                }}
                />
                <Header
                as='h2'
                content={subtitle}
                inverted
                style={{
                    fontSize: this.props.mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginTop: this.props.mobile ? '0.5em' : '1.5em',
                }}
                />
                <Button primary size='huge'>
                {buttonText}
                <Icon name='right arrow' />
                </Button>
            </Container>
        )
    }
}
HeadBanner.propTypes = {
    mobile: PropTypes.bool,
  }

export default HeadBanner;