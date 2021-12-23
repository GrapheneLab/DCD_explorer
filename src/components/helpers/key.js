import React from 'react';
import {IconKey} from "../../svg/index";
import Dropdown from "./dropdown";
import Translate from "react-translate-component";
import {KeyList} from "../userPage/keyList";

export const Key = ({title, data}) => (
    <div className="personal__key">
        <span className="key__ico">
            <IconKey/>
        </span>
        <div className='key__info'>
            <Translate content={`keys.${title}`} className="title key__title"/>
            <span className="text--md">
            {typeof data === 'string'
                ? data
                : <Dropdown popup className='text--md permission__modal'
                            title={<Translate content="account.showKeys" className="text--light" />}
                            data={<KeyList data={data} />}/>
            }
            </span>
        </div>
    </div>
);
