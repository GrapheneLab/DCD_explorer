import React, {Component} from "react";
import Dropdown from "../helpers/dropdown";
import Translate from "react-translate-component";

const ResultField = ({id = '', type = '', commentType = '', bottomSelector = '', topSelector = '', basicPrices = {}, optionsList = [], fieldValues = '', getVal = e => e.preventDefault()}) => {

    let tokenSymbol = topSelector[id].toLowerCase(),
        quantity = bottomSelector[id],
        topValue = fieldValues[id] ? fieldValues[id] : 0,
        result = 0;

    if(type === 'multiply'){
        tokenSymbol = bottomSelector[id].toLowerCase();
        quantity = topSelector[id];
        result = topValue * basicPrices[tokenSymbol][id][quantity]
    } else {
        result = topValue / basicPrices[tokenSymbol][id][quantity];
    }

    if(result > 0.000001){
        result = Number(result.toFixed(8));
    }

    return(
        <div className="calc-item__input">
            <span className="calc-item__result text--md">{result}</span>
            <Dropdown
                className='text--sm dropdown--bg'
                title={<Translate content={`measures.${optionsList.title}.${bottomSelector[id]}`} className="title" />}
                list={optionsList.list.map((elem, index) => (
                    <Translate
                        content={`measures.${optionsList.title}.${elem}`}
                        key={index}
                        component="button"
                        onClick={() => getVal('bottomSelector', elem, id)}
                    />
                ))}
            />
            <Translate content={`calculator.comment.${commentType}`} className="calc-item__input-comment text--sm" with={{title: id}} />
            {/*<span className="calc-item__input-comment text--sm">{comment}</span>*/}
        </div>
    )
};

export default ResultField
