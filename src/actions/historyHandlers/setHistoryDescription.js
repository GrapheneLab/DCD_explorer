import React from "react";
import {operationsWithColors, showDataTypes, systemContract} from "./params";
import Translate from "react-translate-component";
import {IteCode} from "./iteCode";
import {SetShowCodeBtn} from "./setShowCodeBtn";
import {additionalData} from "./defaultHistoryData";

export const setHistoryDescription = (type, data, account) => {
    let content = `actionsList.${type}.text`;
    let charCount = JSON.stringify(data).length;

    if(operationsWithColors[type] && systemContract.includes(account)){

        const dataForTranslate = additionalData[type](data);

        if (type === 'voteproducer') {
            const {proxy, producersList} = dataForTranslate;
            if(!proxy && !producersList.length){
                content = `actionsList.${type}.empty`
            } else if(proxy){
                content = `actionsList.${type}.proxy`
            }
        }

        return <Translate
            content={content}
            className="history-table__description"
            with={dataForTranslate}
        />

    }

    if(showDataTypes.includes(type) || charCount > 200) return <SetShowCodeBtn data={data} type={type}/>;

    return <IteCode code={data.data ? data.data : data }/>
};
