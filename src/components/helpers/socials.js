import React from 'react';
import {
    IconFacebook, IconGithub, IconGolos, IconKeybase, IconMedium, IconReddit, IconSteemit, IconTelegram, IconTwitter,
    IconYoutube
} from "../../svg";

const social = {
    steemit: {
        icon: <IconSteemit/>,
        link: 'https://steemit.com/@',
    },
    facebook: {
        icon: <IconFacebook/>,
        link:'https://www.facebook.com/',
    },
    keybase: {
        icon: <IconKeybase/>,
        link: 'https://keybase.io/',
    },
    reddit: {
        icon: <IconReddit/>,
        link: 'https://www.reddit.com/user/',
    },
    twitter: {
        icon: <IconTwitter/>,
        link: 'https://twitter.com/',
    },
    telegram: {
        icon: <IconTelegram/>,
        link: 'https://telegram.me/',
    },
    github: {
        icon: <IconGithub/>,
        link: 'https://github.com/',
    },
    youtube: {
        icon: <IconYoutube/>,
        link: 'https://www.youtube.com/',
    },
    medium: {
        icon: <IconMedium/>,
        link: 'https://medium.com/@',
    },
    golos: {
        icon: <IconGolos/>,
        link: 'https://golos.io/@',
    },
};

export const Socials = ({data}) => {
    let arrSocial = [];
    for(let elem in data){
        if(social[elem] && data[elem]){
            const link = data[elem].indexOf('http') === 0 ? data[elem] : `${social[elem].link}${data[elem]}`;
            arrSocial.push(<a href={link} key={elem} aria-label={elem} target="_blank" rel='noreferrer' className='social__link'>{social[elem].icon}</a>)
        }
    }
    return arrSocial.map(elem => elem);
};




