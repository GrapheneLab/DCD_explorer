import React from 'react';
import Dropdown from "../helpers/dropdown";
import {IconBP, IconContracts, IconLink, IconProxy} from "../../svg";
import {Socials} from "../helpers/socials";
import Tooltip from "../helpers/tooltip";
import {Link} from "react-router-dom";

const regalyIcon = {
    contract: <IconContracts/>,
    producer: <IconBP/>,
    proxy: <IconProxy/>,
};

const setTooltip = (name, userName) => {
    const icon = regalyIcon[name];
    return (
        <Tooltip text={`account.regaly.${name}`}>
            {name === 'contract'
                ? <Link to={`/contract/${userName}/`} className="regaly">{icon}</Link>
                : <span className="regaly">{icon}</span>
            }
        </Tooltip>
    );
};

export const UserRegaly = (
    {
        userName = '',
        contract = false,
        producer = false,
        socials = false,
        proxy = false
    }
) => (
    <div className="regaly__wrapper">
        {contract ? setTooltip('contract', userName) : ''}
        {producer ? setTooltip('producer') : ''}
        {proxy ? setTooltip('proxy') : ''}
        {
            socials &&
            <Dropdown title={<IconLink/>} right icon
                      className='dropdown--bg personal__socials'
                      data={
                          <div className="social">
                              <Socials data={socials}/>
                          </div>
                      }
            />
        }
    </div>
);
