import {dateToLocal} from "../dateNumFuncs";
import {setMeasure} from "./setMeasure";
import {bytesList, secondsList} from "../../components/data_temp";

export const formatTrxData = (info) => {
    let status = [];
    let cpu = 0, net = 0;
    const {block_time, block_num, last_irreversible_block, trx, transaction, published, expiration} = info;

    let blockTime = block_time ? dateToLocal(block_time) : '----';

    if(block_num) status.push('executed');

    last_irreversible_block > block_num
        ? status.push('irreversible')
        : status.push('pending');

    if(trx){
        cpu = setMeasure(trx.receipt.cpu_usage_us, {
            titles: secondsList,
            divider: 1000
        });
        net = setMeasure(trx.receipt.net_usage_words, {
            titles: bytesList,
            divider: 1024
        });
    }

    let expTime = 0;
    let def = '0 s';
    let actNum = 0;

    if(trx && trx.trx){
        expTime = dateToLocal(trx.trx.expiration);
        def = trx.trx.delay_sec + ' s';
        actNum = trx.trx.actions.length;
    }

    if(transaction){
        blockTime = dateToLocal(published);
        expTime = dateToLocal(expiration);
        def = transaction.delay_sec + ' s';
        actNum = transaction.actions.length;
        status = ['deferred'];
    }

    return {
        blockTime,
        expTime,
        def,
        actNum,
        status,
        cpu,
        net
    }
};
