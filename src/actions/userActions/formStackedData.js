import React from "react";
import {Link} from "react-router-dom";
import {chainOperation, setFixedNum} from "../index";
import {formTableParams} from "../tableFuncs";

function Resources(){
    this.ram = '';
    this.cpu = '';
    this.net = '';
}

const getDelegatedTo = async (name) => (
    await chainOperation('get_table_rows', formTableParams({table: 'delband', scope: name}))
        .then(e => e.rows.filter(e => e.from !== e.to))
        .catch(() => false)
);

const addRamData = (data) => ({
    max: data.ram_quota,
    used: data.ram_usage,
    available: data.ram_quota - data.ram_usage
});

export const formStackedData = (name, data, delegated) => {
    const paramName = `${name}_limit`;

    if(!data[paramName]){
        return false;
    }

    let delegated_to = 0;

    const delegatedName = `${name}_weight`;
    const selfDelegated = data.self_delegated_bandwidth ? Number(data.self_delegated_bandwidth[delegatedName].split(' ')[0]) : 0;
    const totalResources = data.total_resources ? data.total_resources[delegatedName] : '-1';
    const delegatorsList = delegated.map((elem, index) => {

        let [number, symbol] = elem[delegatedName].split(' ');

        number = setFixedNum(number);

        let result = '';

        if(number > 0){

            delegated_to = delegated_to + number;

            result =
                <li key={index} className="title">
                    <Link className="link--ghost" to={`/accounts/${elem.to}`}>{elem.to}</Link>: <span className="value">{number}</span> {symbol}
                </li>;
        }

        return result;
    }).filter(elem => elem);

    // console.log(delegated);

    let param = {...data[paramName]};

    param['total_weight'] = totalResources;

    param['stacked'] = {
        self_delegated: setFixedNum(selfDelegated),
        delegated_from: setFixedNum(totalResources.split(' ')[0] - selfDelegated),
        delegated_to: setFixedNum(delegated_to),
        delegatorsList
    };

    return param;
};

export const formResourcesData = async (data) => {

    const resources = new Resources();
    const delegated = await getDelegatedTo(data.account_name);

    resources['ram'] = addRamData(data);
    resources['cpu'] = formStackedData('cpu', data, delegated);
    resources['net'] = formStackedData('net', data, delegated);

    return resources
};
