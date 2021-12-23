import ScatterJS from 'scatterjs-core';
import {store} from 'index';

export const emitAction = async ({actions, broadcast = true}) => {
    const eos = store.getState().scatter.network;
    const account = ScatterJS.account('eos');
    const options = { blocksBehind: 3, expireSeconds: 30, broadcast };
    const authorization = [{ actor: account.name, permission: account.authority }];

    actions = actions.map(el => ({...el, authorization}));

    const scatterTrx = async () => await eos.transact({ actions }, options)
        .then(e => {
            return e;
        })
        .catch(err => {
            const msg = err.message;

            if(msg.match(/(Transaction took too long|transaction was executing for too long)/)) return scatterTrx();
            if(msg.match(/Table id not set/)) return false;

            throw new Error(err.message);
        });

    return scatterTrx();
};

export const voteProducer = async (voter, proxy, producers) => {
    const actions = [{
        account: 'eosio',
        name: 'voteproducer',
        data: {voter, proxy, producers},
    }];
    return emitAction({actions});
};
