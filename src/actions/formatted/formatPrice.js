import {chainOperation} from "..";
import {formTableParams} from "../tableFuncs";

export const countPrice = (quote, base, fn) => fn(quote, base);

export const getRamPrice = async () => (
    await chainOperation('get_table_rows', formTableParams({table: "rammarket"})).then(e => {

        const data = e.rows[0];
        return countPrice(
            data.quote.balance.split(' ')[0],
            data.base.balance.split(' ')[0],
            (quote, base) => Number((quote / base * 1024).toFixed(8))
        )
    })
);

export const getAdditionalPrices = async () => {
    const additionalPriceData = await chainOperation('get_account', {account_name: 'eosnewyorkio'}).catch(() => false);

    if(!additionalPriceData){
        return{
            networkEosPrice: 0,
            cpuEosPrice: 0
        }
    }

    const networkEosPrice = countPrice(
        additionalPriceData.total_resources.net_weight.split(' ')[0],
        additionalPriceData.net_limit.max,
        (quote, base) => Number((quote / (base / 1024) / 3).toFixed(8))
    );

    const cpuEosPrice = countPrice(
        additionalPriceData.total_resources.cpu_weight.split(' ')[0],
        additionalPriceData.cpu_limit.max,
        (quote, base) => Number((quote / (base / 1024) / 3).toFixed(8))
    );

    return {networkEosPrice, cpuEosPrice}
};
