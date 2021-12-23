import React from "react";
import {operationsWithColors, otherDefaultOps, systemContract} from "./params";
import Translate from "react-translate-component";

export const setHistoryType = (type, account = '') => {

    let translateContent = `actionsList.${type}.title`;

    if (operationsWithColors[type] && systemContract.includes(account)) {
        return <Translate content={translateContent} className={`text--${operationsWithColors[type]}`}/>
    }

    if(otherDefaultOps.includes(type)){
        return <Translate content={translateContent} className={`text--grey`}/>
    }

    return <span className="text--grey">{account} - {type}</span>
};

// export default setHistoryType;
