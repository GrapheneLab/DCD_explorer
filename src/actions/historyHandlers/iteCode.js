import React, {Fragment} from "react";
import {ops} from './params';

export const IteCode = ({code}) => {
    const needStyling = ops.some(elem => code.hasOwnProperty(elem));

    if(needStyling){
        let viewData = [];
        for(let key in code){
            let value = typeof code[key] !== 'object' ? code[key] : JSON.stringify(code[key]);
            viewData.push(
                <Fragment>
                    <span className="text--light">
                        {key}
                    </span>: <span className="text--grey">
                        {value}
                    </span>
                </Fragment>
            )
        }
        return viewData.map((e,index) => <div key={index} className='history-table__description'>{e}</div>);
    }

    let json = JSON.stringify(code, null, "\t");
    return (
        <pre className="history-table__pre">
            {json.substr(2, json.length - 3)}
        </pre>
    );
};
