import React from 'react';
import Translate from "react-translate-component";
import {Link} from "react-router-dom";
import {dateToLocal} from "../../actions";
import {IconCube, IconStar, IconTrx} from "../../svg";

export const BlockHeader = ({data}) => {
    const {timestamp, transactions, actions_count, block_num, previous, transaction_mroot, action_mroot} = data;

    const infoItems = [
        {title: 'created', ico: <IconCube/>, desc: dateToLocal(timestamp)},
        {title: 'trx', ico: <IconTrx/>, desc: transactions.length},
        {title: 'actions', ico: <IconStar/>, desc: actions_count},
    ];

    const keysItems = [
        {title: 'trxMroot', info: transaction_mroot},
        {title: 'actionMroot', info: action_mroot},
    ];

    return (
        <div className="card personal__card">
            <div className="block__info-wrapper">
                {infoItems.map( el =>
                    <div className="block__info">
                        <span className="key__ico">{el.ico}</span>
                        <div className="block__info-text">
                            <Translate content={`blockPage.${el.title}`} className="title"/>
                            <span className="text--md">{el.desc}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="personal__key">
                <p className='key__info'>
                    <Translate content="blockPage.previousBlock" className="title key__title"/>
                    {block_num > 1
                        ? <Link to={`/block/${block_num - 1}`}
                                className="text--sm text--light link--ghost"> {previous} </Link>
                        : <span className='text--sm'>{previous}</span>
                    }
                </p>
            </div>

            {keysItems.map( el =>
                <div className="personal__key">
                    <p className='key__info'>
                        <Translate content={`keys.${el.title}`} className="title key__title"/>
                        <span className="text--sm"> {el.info} </span>
                    </p>
                </div>
            )}
        </div>
    )
};
