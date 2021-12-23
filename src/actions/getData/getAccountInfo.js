import React from 'react';
import {chainOperation} from "..";
import {
    User,
    formBalanceData,
    formUserProperties,
    formProducerData,
    formResourcesData,
    formVotingData,
    formKeysList,
    setUserInfo
} from "../userActions";
import {getBackendData} from "./getBackendData";
import {setFixedNum} from "../dateNumFuncs";
import {formTableParams} from "../tableFuncs";

export const accountInfo = async (name) => {

    const data = await chainOperation('get_account', {account_name: name, json: true});

    // await chainOperation('get_abi',{account_name: 'eosforumrcpp'}).then(e => console.log(e));
    //
    // await chainOperation('get_table_rows', formTableParams({
    //     code: "eosforumrcpp",
    //     scope: "eosforumrcpp",
    //     table: "vote",
    //     lower_bound: "",
    //     index: 2,
    //     key_types: 'i128',
    //     limit: 1000
    // })).then(e => console.log(e));

    // {
    //     id: 768
    //     proposal_name: "eos"
    //     updated_at: "2018-11-18T21:51:04"
    //     vote: 0
    //     vote_json: ""
    //     voter: "barcelonabcn"
    // }

    if(!data) return false;


    const {voter_info} = data;
    // const creator = await getBackendData('gcu', {name}).then(e => e.create_by).catch(err => '');
    const producerData = false;//await getBackendData('gpd', {name}).then(e => e);
    const proxyData = voter_info && voter_info.is_proxy > 0
        ? await chainOperation('get_table_rows', formTableParams({
            code: "regproxyinfo",
            scope: "regproxyinfo",
            lower_bound: name,
            table: "proxies",
            limit: 1,
        })).then(e => e.rows[0].owner === name ? e.rows[0] : false)
        : false;

    let userInfo = new User();

    userInfo.info = await setUserInfo(data, '', producerData, proxyData);
    userInfo.resources = await formResourcesData(data);

    const delegated = setFixedNum(userInfo.resources.cpu.stacked.delegated_to + userInfo.resources.net.stacked.delegated_to);

    userInfo.balances = formBalanceData(data, delegated);
    userInfo.properties = await formUserProperties(data);
    userInfo.producerData = await formProducerData(producerData);
    userInfo.votingData = await formVotingData(name, voter_info);
    userInfo.keysList = formKeysList(data, producerData);

    return userInfo;
};
