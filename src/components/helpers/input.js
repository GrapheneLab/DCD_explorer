import React from 'react';

const Input = ({
   id = '',
   type = 'text',
   placeholder = '',
   label = '',
   errors = '',
   value = '',
   className = '',
   disabled = false,
   getVal = e => e.preventDefault
}) => {

    const hasValue = value && (value[id] || value[id] === 0);
    const hasErrors = errors && errors[id];

    className = className ? className + ' input' : 'input';

    if(hasErrors){
        className += ' input--invalid';
    } else if(hasValue){
        className += ' input--valid';
    }

    if(disabled){
        className += ' input--disabled';
    }

    return (
        <div className={className}>
            {label ? <label htmlFor={id}>{label}</label> : ''}

            <input className="input__field" id={id} type={type}
                   onChange={e => getVal(e.target.value, id)}
                   value={hasValue ? value[id] : ''}
                   aria-label={id}
                   placeholder={placeholder}
                   disabled={disabled}
            />

            {hasErrors ? <span>{errors[id]}</span> : ''}
        </div>
    );

};

export default Input;
