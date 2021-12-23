import React from 'react';
import Translate from "react-translate-component";
import PendingTimer from "../helpers/pendingTimer";

export const TrxStatus = ({status, time}) => (
    <div className="trx__status-wrapper text--sm">
        {status.map(el =>
            el !== 'pending'
                ? <Translate key={el} content={`trxPage.status.${el}`} className={`trx__status ${el}`} />
                : <PendingTimer time={time}/>
        )}
    </div>
);
