import React, { Component } from 'react';
import {getCookie, setCookie} from "../../actions";
import Translate from "react-translate-component";

class CookieWarning extends Component{
    state = {
        show: getCookie('cookieAccepted') ? true : false
    };

    acceptCookie = () => {
        this.setState({show: true});
        setCookie('cookieAccepted', true)
    };

    render(){
        return (
            <div className={`cookie-warning${this.state.show ? '' : ' cookie-warning--show'}`}>
                <Translate
                    content="cookieWarning.text"
                    component="p"
                    with={{
                        link: <Translate
                            content="cookieWarning.link"
                            component="a"
                            href='https://policies.google.com/technologies/cookies'
                            className='text--accent'
                            target='_blank'
                            rel='noreferrer'
                        />
                    }}
                />
                <Translate content="cookieWarning.btn" component="button" onClick={this.acceptCookie} className='btn--gradient' aria-label="accept cookies" />
            </div>
        )
    }
}

export default CookieWarning;
