import React from "react";
import {addNumSpaces, dateToLocal} from "../dateNumFuncs";
import {setInternalLink} from "./wrappers";

export const trxDecorator = {
    trxID: ({id}) => setInternalLink('/trx/', `${id.substr(0, 30)}...`, id),
    created: ({created}) => dateToLocal(created),
    cpu_usage_us: ({cpu_usage_us}) => addNumSpaces(cpu_usage_us),
    net_usage_words: ({net_usage_words}) => addNumSpaces(net_usage_words),
    expiration: ({expiration}) => <span className='text--grey'>{expiration}</span>,
};
