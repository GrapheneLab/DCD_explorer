import React from 'react';
import Translate from "react-translate-component";

const Textarea = ({id, errors, placeholder, className, getVal}) => (
    <div className={`textarea${className ? ` ${className}` : ''}`}>
        <Translate
            component="textarea"
            className="textarea__field"
            id={id}
            cols="60"
            rows="10"
            onChange={(e) => getVal(e.target.value, id)}
            attributes={{ placeholder: placeholder || "Message" }}
        />
        {errors[id]
            ? <Translate content={`formErrors.${errors[id].type}`} with={{param: errors[id].param}} className="textarea__error" />
            : ''
        }
    </div>
);

export default Textarea
