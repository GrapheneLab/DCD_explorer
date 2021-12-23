import React from 'react';
import Translate from "react-translate-component";

const Btn = ({type, className, handleClick, additionalData}) => <Translate content={`buttons.${type}`} component="button" className={className} onClick={handleClick} with={{additionalData}} />;

export default Btn;