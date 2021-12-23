import React from "react";
import {setInternalLink} from "./wrappers";

export const voteDecor = {
    name: ({name}) => setInternalLink(`/accounts/`, name),
    proxy: ({proxy}) => <span className='text--success'>{proxy}</span>
};
