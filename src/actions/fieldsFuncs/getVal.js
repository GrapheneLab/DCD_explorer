import {validateFields} from "./validate";
import {getDefaultSendData, getStealthSendData} from "./getSendData";

/***
 * Using old function for bind from components with forms!
 * Don't change to arrow functions because it won't bind with component
 * and func won't receive context (this) of parent component!
 * ***/

export const getVal = function(val, idName){

    let formData = this.state.formData;

    formData[idName] = val;

    if(idName === 'amount' && !formData['fee']){
        formData = getDefaultSendData(formData, this.state.feeParams);
    } else if(idName === 'stealth-amount'){
        formData = getStealthSendData(formData, this.state.feeParams);
    }

    let errors = validateFields(formData);

    this.setState({formData, errors});
};
