import React from 'react';
import {addNumSpaces, dateToLocal} from "../dateNumFuncs";
import {Link} from "react-router-dom";

export const bidDecor = {
    name: (newname) => <span className='text--success'>{newname}</span>,
    high_bid: (high_bid) => addNumSpaces(high_bid / 10000) + ' EOS',
    bidder: (high_bidder) => <Link to={`/accounts/${high_bidder}`} className='link--ghost'>{high_bidder}</Link>,
    last_bid: (last_bid_time) => dateToLocal(last_bid_time)
};
