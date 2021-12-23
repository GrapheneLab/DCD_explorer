import React, {Fragment} from 'react';
import {chainOperation} from "./index";
import {Link} from "react-router-dom";
import {historyOperation} from "./configRequests";
import Translate from "react-translate-component";
import {getBackendData} from "./getData/getBackendData";

const getAccounts = async (value) => {
    let controledArr = [];

    const accFromStraightRequest = await chainOperation('get_account', {account_name: value})
        .then(e => e.account_name)
        .catch(() => false);

    // const accsFromTable = await getBackendData('gnl', {name: value, boundary: '0', offset: '10'})
    //     .then(e => e)
    //     .catch(() => []);

    // if(value.includes('.')){
    //
    //     let valuesArr = value.split('.');
    //
    //     controledArr =
    //         await Promise.all(
    //             valuesArr.map( async (elem) => (
    //                 await historyOperation('get_controlled_accounts', {controlling_account: elem})
    //                     .then(e => e.controlled_accounts.filter(elem => elem.indexOf(value) === 0))
    //             ))
    //         )
    //             .then(e => e.reduce((acc, next) => acc.concat(next), []))
    //             .catch(() => []);
    // }

    return accFromStraightRequest && [accFromStraightRequest, ...controledArr];
};

export const tryRequest = async (value) => {
    value = value.split(' ').join('');

    let block = [],
        trx = [],
        keys = [],
        usersData = [];

    if(!value && value.length === 0){
        return {block, trx, usersData, keys}
    }

    if(!isNaN(value)){
        await chainOperation('get_block', {block_num_or_id: value})
            .then(e => {console.log(e); return block.push(e.block_num)})
            .catch(() => false);
    }

    // if(value.length === 64){
    //     await historyOperation('get_transaction', {id: value}).then(e => e ? trx.push(e.id) : false).catch(() => false);
    //     await chainOperation('get_scheduled_transactions', {lower_bound: value, limit: 1}).then(e => {
    //         let temp = e.transactions && e.transactions.filter(el => el.trx_id === value);
    //         temp.length > 0 && trx.push(temp[0].trx_id);
    //     }).catch(() => false);
    // }
    //
    // if(value.length === 53 && value.indexOf('EOS') === 0){
    //     await historyOperation('get_key_accounts', {public_key: value}).then(e => e.account_names ? e.account_names : false)
    //         .then(e => e.length ? keys.push(e) : false)
    //         .catch(() => false);
    // }

    if(value.length <= 12){
        usersData = await getAccounts(value.toLowerCase())
            .then(e => e ? e : [])
            .catch(() => ({dom: []}));
    }

    if(!block && !trx && !usersData.length && !keys){
        return false
    }

    return {block, trx, usersData, keys}
};

export const hintsDOM = ({block, trx, keys, usersData}) => {

    const description = <Translate content={`header.hintDesc`} className="hints__description text--md" />;
    let dom = [];

    if(!block.length && !trx.length && !keys.length && !usersData.length){
        return (
            <Fragment>
                {description}
                <Translate content="hints.error" className="hints__error text--md" />
            </Fragment>
        )
    }

    if(usersData && usersData.length > 0){
        dom.push({heading: 'usersList', data: usersData, link: '/accounts/'});
    }

    if(block  && block.length > 0){
        dom.push({heading: 'blocksList', data: block, link: '/block/'});
    }

    // if(data.trx  && data.trx.length > 0){
    //     dom.push({heading: 'trxList', data: data.trx, link: '/trx/'});
    // }
    //
    // if(data.keys  && data.keys.length > 0){
    //     dom.push({heading: 'keysList', data: data.keys, link: '/accounts/'});
    // }

    return (
        <Fragment>
            {description}
            {dom.map(category =>
                <div key={category.heading} className="hints__list">
                    <Translate content={`header.${category.heading}`} className="text--md" />
                     {category.data.map(el => (
                         <Link key={el} className="card link--ghost text--md" to={`${category.link}${el}`}>
                             {el}
                         </Link>
                     ))}
                </div>
            )}
        </Fragment>
    );
};

export const fullSearch = async (value) => {
    let hints = await tryRequest(value).then(e => e),
        dom = await hintsDOM(hints);

    return { hints, dom }
};
