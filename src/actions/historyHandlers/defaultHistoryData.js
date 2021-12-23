import React, {Fragment} from "react";
import {setInternalLink} from "../tableDecoration/wrappers";

const basicAccLink = '/accounts/';

const transferData = ({from, to, quantity, memo}) => ({
    from: setInternalLink(basicAccLink, from),
    to: setInternalLink(basicAccLink, to),
    summ: <span className="text--accent">{quantity}</span>,
    memo: memo ? `(MEMO: ${memo})` : ''
});

export const additionalData = {
    sent: transferData,
    receive: transferData,
    transfer: transferData,
    delegatebw: ({from, receiver, stake_net_quantity, stake_cpu_quantity}) => ({
        from: setInternalLink(basicAccLink, from),
        to: setInternalLink(basicAccLink, receiver),
        netSumm: <span className="text--accent">{stake_net_quantity}</span>,
        cpuSumm: <span className="text--accent">{stake_cpu_quantity}</span>
    }),
    undelegatebw: ({from, receiver, unstake_net_quantity, unstake_cpu_quantity}) => ({
        from: setInternalLink(basicAccLink, from),
        to: setInternalLink(basicAccLink, receiver),
        netSumm: <span className="text--accent">{unstake_net_quantity}</span>,
        cpuSumm: <span className="text--accent">{unstake_cpu_quantity}</span>
    }),
    buyram: ({from, receiver, unstake_net_quantity, unstake_cpu_quantity}) => ({
        from: setInternalLink(basicAccLink, from),
        to: setInternalLink(basicAccLink, receiver),
        netSumm: <span className="text--accent">{unstake_net_quantity}</span>,
        cpuSumm: <span className="text--accent">{unstake_cpu_quantity}</span>
    }),
    buyrambytes: ({payer, receiver, bytes}) => ({
        from: setInternalLink(basicAccLink, payer),
        to: setInternalLink(basicAccLink, receiver),
        bytes: <span className="text--accent">{bytes}</span>
    }),
    claimrewards: ({owner}) => ({
        owner: setInternalLink(basicAccLink, owner)
    }),
    sellram: ({account, bytes}) => ({
        account: setInternalLink(basicAccLink, account),
        bytes
    }),
    voteproducer: ({voter, proxy, producers}) => ({
        voter: setInternalLink(basicAccLink, voter),
        proxy: proxy ? setInternalLink(basicAccLink, proxy) : '',
        producersList: producers
            ? producers.map((e, index) => {
                let punctuation = index === producers.length - 1 ? '' : ', ';
                return (
                    <Fragment key={index}>
                        {setInternalLink(basicAccLink, e)}{punctuation}
                    </Fragment>
                )
            })
            : ''
    }),
    newaccount: ({name, creator}) => ({
        name: setInternalLink(basicAccLink, name),
        creator: setInternalLink(basicAccLink, creator)
    }),
    regproducer: ({producer}) => ({
        producer: setInternalLink(basicAccLink, producer)
    }),
    bidname: ({bidder, newname, bid}) => ({
        bidder: setInternalLink(basicAccLink, bidder),
        newname: <span className="text--accent">{newname}</span>,
        bid: <span className="text--accent">{bid}</span>
    }),
    regproxy: ({proxy}) => ({
        proxy: setInternalLink(basicAccLink, proxy)
    }),
    unregprod: ({producer}) => ({
        producer: setInternalLink(basicAccLink, producer)
    }),
    deleteauth: ({account, permission}) => ({
        account: setInternalLink(basicAccLink, account),
        permission
    }),
    unlinkauth: ({account, code, type}) => ({
        account: setInternalLink(basicAccLink, account),
        code,
        type
    }),
    refund: ({owner}) => ({
        owner: setInternalLink(basicAccLink, owner)
    }),
    issue: ({to, quantity, memo}) => ({
        to,
        quantity,
        memo: memo ? `MEMO: ${memo}` : ''
    })
};
