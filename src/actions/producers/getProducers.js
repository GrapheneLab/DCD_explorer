import {store} from "../../index";
import {chainOperation, formTableParams, getBackendData} from "../index";
import {formProducersList} from "./formProducerList";

const getProducerList = async (arr = [], lower_bound = '') => {
    return await chainOperation('get_producers', {json: true, index: 2, limit: 500, lower_bound}).then(e => {
        arr = arr.concat(e.rows);
        return e.more
            ? getProducerList(arr, e.more)
            : arr
    })
};

export const getProducers = async () => {
    const token = store.getState().token || 'EOS';
    const supply = await chainOperation('get_currency_stats', {
        code: 'eosio.token',
        symbol: token
    }).then(e => Number(e[token.toUpperCase()].supply.split(' ')[0]));

    const totalVoteWeight = await chainOperation('get_table_rows', formTableParams({table: "global"}))
        .then(e => e.rows[0].total_producer_vote_weight);

    const new_tokens_by_blocks = 0.04879 * supply * 86400 / 31449600;

    const new_tokens_by_vote = 0.04879 * supply * 1152 / 31449600;

    return await
        // getBackendData('gpi', {boundary: "0", offset: "500"})
        // .then(e => formProducersList(e, new_tokens_by_blocks, new_tokens_by_vote, totalVoteWeight, token))
        // .catch(() =>
            getProducerList().then(e => formProducersList(e, new_tokens_by_blocks, new_tokens_by_vote, totalVoteWeight, token))
        // );
        // .catch((err) => console.log(err));
};
