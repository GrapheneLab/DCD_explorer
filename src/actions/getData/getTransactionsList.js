import React from 'react';
import {historyOperation} from "../configRequests";

function Transaction({block_num, action_trace, account_action_seq, block_time}){
    this.id = account_action_seq;
    this.block = block_num;
    this.account_action_seq = account_action_seq;
    this.created = block_time;
    this.trx_id = action_trace.trx_id;
    this.type = action_trace.act.name;
    this.data = action_trace.act.data;
}

export const getTransactionsList = async (pos = -1) => (
    await historyOperation('get_actions', {account_name: 'eosio.token', pos, offset: -50})
        .then(async e => {
            if(e.errors) return [];
            let arr = e.actions.length % 50 === 0 ? e.actions : e.actions.splice(0, 50);
            return arr.reverse().map(elem => new Transaction(elem));
        })
);
