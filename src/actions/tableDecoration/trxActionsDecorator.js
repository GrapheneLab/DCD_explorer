import {setInternalLink} from "./wrappers";
import {setHistoryDescription, setHistoryType} from "../historyHandlers/";
import {Link} from "react-router-dom";
import React from "react";

export const trxActionsDecorator = {
    contract: ({contract}) => setInternalLink('/accounts/', contract),
    authorization: ({authorization}) => setInternalLink('/accounts/', authorization, authorization.split('@')[0]),
    type: ({type, contract}) => setHistoryType(type, contract),
    info: ({type, data, contract}) => setHistoryDescription(type, data, contract)
};

export function Action({account, authorization, name, data}){
    this.contract = account;
    this.type = name;
    this.authorization = authorization.length ? `${authorization[0].actor}@${authorization[0].permission}` : '--------';
    this.data = data;
}
