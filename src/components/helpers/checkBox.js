import React from 'react';
import {IconCheck} from "../../svg";
import Translate from "react-translate-component";

const CheckBox = ({id = '', label = '', value = '', className = '', onChange = e => e.preventDefault(), disabled = false}) => {
    return(
        <label htmlFor={id} className={`checkbox${value ? ' checkbox--selected' : ''}${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}>
            <input id={id} type="checkbox" defaultChecked={value} onClick={onChange} disabled={disabled}/>
            {label && <Translate content={label} className="checkbox__label" />}
            {(!className.match('radio') && !className.match('switch')) &&
                <IconCheck />
            }
        </label>
    )
};

export default CheckBox;
