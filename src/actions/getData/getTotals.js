import {chainOperation, historyOperation} from "../configRequests";
import {getBackendData} from "./getBackendData";

export const getTotals = async (token, totalsValue) => {
    const info = await chainOperation('get_info').then(e => e);
    const action = 0; //await historyOperation('get_actions', {account_name: 'eosio.token', pos: -1, offset: -1}).then(e => e.actions[0].global_action_seq);
    const supply = await chainOperation('get_currency_stats', {
        code: 'eosio.token',
        symbol: token
    });

    const votesStats = await chainOperation('get_table_rows', {
        json: true,
        code: "eosio",
        scope: "eosio",
        lower_bound: '',
        table: "global",
        upper_bound: '',
        limit: 2000,
    }).then(e => ({
        vote_staked: Number(e.rows[0].total_activated_stake)/10000,
        supply: Number(supply[token.toUpperCase()].supply.split(' ')[0])
    }));

    let totals = await getBackendData('gth')
        .then(e => e ? {...e, action} : {...totalsValue, action})
        .catch(() => ({...totalsValue, action}));

    const result = { votesStats, info, totals };

    localStorage.setItem('totals', JSON.stringify(result));

    return result
};
