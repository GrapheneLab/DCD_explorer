import React from 'react';

export const cleanDoubles = (arr) => arr
    .filter((elem, index) => {
        if(index === 0) return true;

        const prevElem = arr[index - 1];
        const prevData = prevElem.data ? prevElem.data : prevElem.act.data;
        const currentElem = elem;
        const currentData = currentElem.data ? currentElem.data : currentElem.act.data;

        return !(
            currentElem.trx_id === prevElem.trx_id
            && currentData.name === prevData.name
            && currentData.to === prevData.to
            && currentData.from === prevData.from
        );
    });

function HistoryItem({account_action_seq, block_time, block_num}, trx_id, name, account, data){
    this.id = account_action_seq;
    this.seq = account_action_seq + 1;
    this.trx_id = trx_id;
    this.date = block_time;
    this.block = block_num;
    this.type = name;
    this.author = account;
    this.data = data;
}

export const formHistoryItems = (arr, userName) => arr
    .map(elem => {

        const act = elem.action_trace.act;
        const trx_id = elem.action_trace.trx_id;

        let {name, account, data} = act;
        let transferred = 0;

        if(typeof data !== 'object'){
            data = {}
        }

        if(name === 'transfer'){
            name = data.from === userName ? 'sent' : 'receive';
            transferred = data.quantity ? Number(data.quantity.split(' ')[0]) : 0;
        }

        data.transferred = transferred;

        return new HistoryItem(elem, trx_id, name, account, data);
    });
