import React, {Fragment} from 'react';
import Translate from "react-translate-component";

export const setMeasure = (number, measure) => {

    const titles = measure.titles.list;

    let resultNum = Number(number).toFixed(3),
        resultTitle = titles[0];

    if(number > measure.divider){

        let i = titles.length - 1;

        for( i; i => 0; i-- ){

            let newDivider = measure.divider ** i;

            if(resultNum > newDivider){
                resultNum = Number(number / newDivider).toFixed(3);
                resultTitle = titles[i];
                break;
            }

        }
    }

    return (
        <Fragment>
            <span className="value">{Number(resultNum)} </span>
            <Translate content={`measures.${measure.titles.title}.${resultTitle}`} />
        </Fragment>
    )
};
