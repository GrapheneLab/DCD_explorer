import {formTableParams} from "../tableFuncs";
import {store} from "../../index";
import {chainOperation} from "../index";
import {dateToLocal, setFixedNum} from "../dateNumFuncs";

function ProducerData({url, count_voters, claimed_rewards}){
    this.count = count_voters;
    this.url = url;
    this.unclaimedReward = 0;
    this.claimedRewards = Number(claimed_rewards);
    this.lastClaimTime = '';
    this.avatar = '';
    this.socials = 0;
}

const countUnclaimedReward = async (data) => {
    const global = await chainOperation('get_table_rows', formTableParams({table: "global"})).then(e => ({
        per_block: e.rows[0].perblock_bucket,
        per_vote: e.rows[0].pervote_bucket,
        total_unpaid: e.rows[0].total_unpaid_blocks,
        global_total_vote: e.rows[0].total_producer_vote_weight,
        last_pervote_bucket_fill: e.rows[0].last_pervote_bucket_fill,
    }));

    const token = store.getState().token || 'EOS';

    const supply = await chainOperation('get_currency_stats', {
        code: 'eosio.token',
        symbol: token
    }).then(e => Number(e[token.toUpperCase()].supply.split(' ')[0]));

    const last_pervote = String(global.last_pervote_bucket_fill).substr(0, 10);

    const currentUnixTime = new Date().getTime() / 1000;
    const new_tokens = 0.04879 * supply * (currentUnixTime - last_pervote) / 31449600;
    const to_producers = new_tokens / 5;
    const to_per_block_pay = to_producers / 4;
    const to_per_vote_pay = to_producers - to_per_block_pay;
    const perblock_bucket = to_per_block_pay + global.per_block;
    const pervote_bucket = to_per_vote_pay + global.per_vote;

    const blocks_rewards = perblock_bucket * data.unpaid_blocks / global.total_unpaid / 10000;
    const vote_rewards = pervote_bucket * data.total_votes / global.global_total_vote / 10000;

    return setFixedNum(blocks_rewards + vote_rewards);
};

const getLastClaimTime = async (data, unclaimed) => {
    const producer = await chainOperation('get_producers', {lower_bound: data.owner, limit: 1, json: true}).then(e => e.rows[0]);

    if(unclaimed <= 100) return '';

    const today = new Date().getTime();
    const lastClaimTime = new Date(producer.last_claim_time).getTime();
    const showReward = (today - lastClaimTime) > 24 * 3600 * 1000;

    if(!showReward){
        return dateToLocal(lastClaimTime)
    } else {
        return '';
    }
};

export const formProducerData = async (data) => {
    if(!data) return false;

    const producer = new ProducerData(data);

    producer.unclaimedReward = await countUnclaimedReward(data);
    producer.lastClaimTime = await getLastClaimTime(data, producer.unclaimedReward);

    return producer;
};
