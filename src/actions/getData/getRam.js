import {chainOperation} from "../configRequests";
import {formTableParams} from "../tableFuncs";
import {getBackendData} from "./getBackendData";
import {getRamPrice} from "../formatted/formatPrice";

export const getRam = async (token) => {
    const collected = await chainOperation('get_account', {account_name: 'eosio.ram'}).then(e => e.core_liquid_balance);
    const fee = await chainOperation('get_account', {account_name: 'eosio.ramfee'}).then(e => e.core_liquid_balance);
    const free = await chainOperation('get_table_rows', formTableParams({table: "rammarket", limit: 1})).then(e => e.rows[0].base.balance);
    const {max_ram_size: max, total_ram_bytes_reserved: reserved} = await chainOperation('get_table_rows', formTableParams({table: "global"})).then(e => e.rows[0]);
    // const usedRam = await getBackendData('gth').then(e => e.ram_usage);
    const price = await getRamPrice().then(e => e);
    const stacked = await chainOperation('get_account', {account_name: 'eosio.stake'}).then(e => e.core_liquid_balance.split(' ')[0]);
    const supply = await chainOperation('get_currency_stats', {
        code: 'eosio.token',
        symbol: token
    });

    const result = {
        stacked,
        supply: supply[token.toUpperCase()],
        ram: { collected, fee, free, max, reserved, price }
    };

    localStorage.setItem('ram', JSON.stringify(result.ram));

    return result;
};
