import React from 'react';
import {Link} from "react-router-dom";
import {IconAccounts, IconLink} from "../../svg";

export const setInternalLink = (link, text, id = '') => (
    <Link to={`${link}${id ? id : text}`} className='link--ghost'>
        {text}
    </Link>
);

export const setExternalLink = (url) => (
    <a href={url} rel='noopener' target='_blank'>
        <IconLink/>
    </a>
);

export const accountWithAvatar = (avatar, name) => (
    <div className='link__wrapper'>
                <span className="avatar">
                    {avatar
                        ? <img src={avatar} alt={`${name} avatar`} />
                        : <IconAccounts className='ico totals__ico'/>
                    }
                </span>
        {setInternalLink('/accounts/', name)}
    </div>
);
