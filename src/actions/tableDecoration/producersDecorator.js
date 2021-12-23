import React from "react";
import {setDefaultNumber} from "../dateNumFuncs";
import {accountWithAvatar, setExternalLink} from "./wrappers";

export const producersDecor = {
    location: ({location}) => <span className="flag__wrapper"><i className={`flag ${location.flag}`}/>{location.name}</span>,
    eos_votes: ({eos_votes}) => <span className="text--success">{setDefaultNumber(eos_votes, 0)}</span>,
    url: ({url}) => setExternalLink(url),
    link: ({avatar, owner}) => accountWithAvatar(avatar, owner),
    percentVote: ({percentVote}) => setDefaultNumber(percentVote, 2) + '%'
};
