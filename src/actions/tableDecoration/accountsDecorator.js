import React from "react";
import {dateToLocal} from "../index";
import {setDefaultNumber} from "../dateNumFuncs";
import {setInternalLink} from "./wrappers";

export const accountsDecor = {
    owner: ({name}) => setInternalLink(`/accounts/`, name),
    balance: ({balance}) => <span className='text--success'>{setDefaultNumber(balance)} EOS</span>,
    create_at: ({date_creation}) => dateToLocal(date_creation),
    create_by: ({create_by}) => !create_by ? '' : setInternalLink(`/accounts/`, create_by),
};
