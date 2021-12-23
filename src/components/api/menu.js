import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";

const Menu = ({basicLink}) => {
    return (
        <Fragment>
            <NavLink className='api__menu-item' to={`${basicLink}`} exact >
                <span className='text--lg'>Home</span>
            </NavLink>
            <NavLink className='api__menu-item' to={`${basicLink}/auth/`} exact >
                <span className='text--lg'>Authorization / registration</span>
            </NavLink>
            <NavLink className='api__menu-item' to={`${basicLink}/transactions/`} exact >
                <span className='text--lg'>Transactions in the blockroom</span>
            </NavLink>
            <NavLink className='api__menu-item' to={`${basicLink}/glossary/`} exact >
                <span className='text--lg'>Glossary</span>
            </NavLink>
            <NavLink className='api__menu-item' to={`${basicLink}/balance/`} exact >
                <span className='text--lg'>Balance</span>
            </NavLink>
            <NavLink className='api__menu-item' to={`${basicLink}/vote/`} exact >
                <span className='text--lg'>Vote</span>
            </NavLink>
        </Fragment>
    )
};

export default Menu
