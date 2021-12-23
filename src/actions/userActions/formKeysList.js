import React from 'react';
import Link from "react-router-dom/es/Link";

function KeysList(){
    this.producerKey = '';
    this.userKeys = '';
}

function UserKeys(){
    this.type = '';
    this.data = '';
}

function DefaultKeys(activeKey, ownerKey){
    this.activeKey = activeKey || '';
    this.ownerKey = ownerKey || '';
}

function MultisigData({parent, perm_name, required_auth}, keys){
    this.id = `permission-${perm_name}`;
    this.permName = perm_name;
    this.parent = parent;
    this.threshold = required_auth.threshold;
    this.keyAcc = keys;
}

const formMultisig = (data) =>
    data.map(elem => {
        let arrKeys = [];
        const {accounts, keys, threshold} = elem.required_auth;

        if(accounts.length){
            arrKeys = arrKeys.concat(accounts.map(key => {
                const {actor, permission} = key.permission;
                return <Link to={`/accounts/${actor}`} key={`${actor}-${permission}`} className='wrap text--light'>
                    ({key.weight}/{threshold}) {`${actor}@${permission}`}
                </Link>
            }))
        }
        if(keys.length){
            arrKeys = arrKeys.concat(keys.map(key =>
                <span key={`${key.key}`} className='wrap'>
                    ({key.weight}/{threshold}) {key.key}
                </span>
            ))
        }

        return new MultisigData(elem, arrKeys);
    });

const formUserKeys = (data) => {
    let result = new UserKeys();

    const activeKeys = data.find(elem => elem.perm_name === 'active').required_auth;
    const ownerKeys = data.find(elem => elem.perm_name === 'owner').required_auth;

    if(activeKeys.keys.length === 1
        && ownerKeys.keys.length === 1
        && !activeKeys.accounts.length
        && !ownerKeys.accounts.length
    ){
        result.type = 'keys';
        result.data = new DefaultKeys(activeKeys.keys[0].key, ownerKeys.keys[0].key);
    } else {
        result.type = 'multisig';
        result.data = formMultisig(data);
    }

    return result;
};

export const formKeysList = (userData, producerData) => {
    let keysList = new KeysList();

    keysList.producerKey = producerData ? producerData.producer_key : false;
    keysList.userKeys = formUserKeys(userData.permissions);

    return keysList;
};
