import React from "react";
import Dropdown from "../helpers/dropdown";
import Input from "../helpers/input";
import Translate from "react-translate-component";

const InputField = ({id = '', selected = '', commentType = '', optionsList = [], fieldValue = '', getVal = e => e.preventDefault()}) => (
    <div className="calc-item__input">
        <Input id={id} value={fieldValue} getVal={e => getVal('field', e, id)} placeholder="Enter value" />
        <Dropdown
            className='text--sm dropdown--bg'
            title={<Translate content={`measures.${optionsList.title}.${selected[id]}`} className="title" />}
            list={optionsList.list.map((elem, index) => (
                <Translate
                    content={`measures.${optionsList.title}.${elem}`}
                    key={index}
                    component="button"
                    onClick={() => getVal('topSelector', elem, id)}
                />
            ))}
        />
        <Translate content={`calculator.comment.${commentType}`} className="calc-item__input-comment text--sm" with={{title: id}} />
    </div>
);

export default InputField
