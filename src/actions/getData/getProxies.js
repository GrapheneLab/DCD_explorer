import React from "react";
import {Link} from "react-router-dom";
import {getBackendData} from "..";
import {chainOperation} from "../configRequests";
import {setDefaultNumber} from "../dateNumFuncs";
import {IconAccounts, IconLink} from "../../svg";

function Proxy(index, {name, count_voters, count_slave, proxied_vote_weight}, json){
    this.id = name;
    this.rank = index + 1;
    this.name = name || '';
    this.voters = count_voters || 0;
    this.slave = count_slave || 0;
    this.vote_weight = proxied_vote_weight || 0;
    this.avatar = json.logo_256 || '';
    this.url = json.website || '';
    this.registered = JSON.stringify(json) !== '{}';
}

const getAllRegProxies = async (acc = [], bound = '') =>
    await chainOperation('get_table_rows', {json: true, code: "regproxyinfo", scope: "regproxyinfo", table: "proxies", lower_bound: bound, limit: 200})
        .then(e => !e.more ? [...acc, ...e.rows] : getAllRegProxies([...acc, ...e.rows], e.rows[e.rows.length - 1].owner));

export const formatProxies = async () => {
    const data = await getBackendData('gpri', {boundary: "0", offset: "1000"}).then(e => e.status ? [] : e);
    const contractData = await getAllRegProxies();

    if(!data || !data.length){
        return []
    }

    return data.map((el, index) => {
        const json = contractData.find(json => json.owner === el.name) || {};
        return new Proxy(index, el, json);
    });
};
