import React from 'react';
import {IconCPU, IconNetwork, IconStar, IconTimer} from "../../svg";
import Translate from "react-translate-component";
import TrxCard from "./trxCard";

export const TrxInfo = ({id, cpu, net, actions, deferred}) => {
    const trxCard = [
        {title: 'cpuNum', ico: <IconCPU className="fill" />, value: cpu},
        {title: 'netNum', ico: <IconNetwork className="fill" />, value: net},
        {title: 'actionsNum', ico: <IconStar />, value: actions},
        {title: 'deferred', ico: <IconTimer />, value: deferred}
    ];

    return (
        <div className="card trx__card">
            <div className="trx__id">
                <Translate content='tableHead.transactionID' className='title'/>
                <span className='text--md'>{id ? id : id}</span>
            </div>
            <div className="trx__totals">
                {trxCard.map(el => <TrxCard key={el.title} title={`trxPage.${el.title}`} num={el.value} icon={el.ico} />)}
            </div>
        </div>
    )

};
