import React from 'react';
import {Avatar} from "../helpers/avatar";
import Translate from "react-translate-component";
import Link from "react-router-dom/es/Link";

export const AccountHeader = ({name, avatar, url = false, created, creator}) => (
    <div className={`personal__info BP`}>
        <div className="personal__name text--lg">
            <Avatar name={name} avatar={avatar}/>
            <span className="name">
                <Translate content='tableHead.name' className='title'/>
                {name}
                {url &&
                    <Translate
                        content="account.site"
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noopener"
                        className='title text--success'
                    />
                }
            </span>
        </div>
        <div className="personal__prop-wrapper">
            <span className="personal__prop create text--md">
                <Translate content="account.createdTime" className='title'/>
                {created}
            </span>
            <span className="personal__prop create_by text--md">
                <Translate content="account.createdBy" className='title'/>
                {creator
                    ? <Link to={`/accounts/${creator}`} className="link--ghost text--lg">{creator}</Link>
                    : '---------'
                }
            </span>
        </div>
    </div>
);
