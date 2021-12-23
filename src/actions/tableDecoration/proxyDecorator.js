import React from "react";
import {accountWithAvatar, setExternalLink} from "./wrappers";
import {weightToEOS} from "../getData/getVoteWeight";
import {setDefaultNumber} from "../dateNumFuncs";

export const proxyDecorator = {
    vote_weight: ({vote_weight}) => <span className='text--success'>{setDefaultNumber(weightToEOS(vote_weight))} EOS</span>,
    url: ({url}) => url ? setExternalLink(url) : '----',
    link: ({avatar, name}) => accountWithAvatar(avatar, name)
};
