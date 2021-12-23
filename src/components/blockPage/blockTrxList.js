import React, {Fragment} from 'react';
import Translate from "react-translate-component";
import {dateToLocal, trxDecorator} from "../../actions";
import Table from '../table/table';

function TransactionData({trxID = '', trx, cpu_usage_us = 0, net_usage_words = 0}){
    this.id = trxID;
    this.expiration = trx.transaction ? dateToLocal(trx.transaction.expiration) : 'N/A';
    this.actionCount = trx.transaction ? trx.transaction.actions.length : 0;
    this.cpu_usage_us = cpu_usage_us;
    this.net_usage_words = net_usage_words
}

export const BlockTrxList = ({data}) => {
    const trxTable = data
        .map(el => {
            const {trx} = el;
            const trxData = trx.transaction;
            const trxID = trxData ? trx.id : trx;

            return new TransactionData({...el, trxID});
        });

    return (
        <Fragment>
            <Translate component='h2' content="transactions.title" className="heading col-md-12"/>
            {trxTable.length &&
                <Table
                    className='trx__table'
                    head={[
                        {key: 'trxID', title: 'transactionID'},
                        {key: 'cpu_usage_us', title: 'cpuUsage'},
                        {key: 'net_usage_words', title: 'netUsage'},
                        {key: 'expiration', title: 'expiration'},
                        {key: 'actionCount', title: 'actionCount'}
                    ]}
                    onEmpty="blockPage"
                    data={trxTable}
                    decorate={trxDecorator}
                />
            }
        </Fragment>
    )

};
