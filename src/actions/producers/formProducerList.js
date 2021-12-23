import React from 'react';
import {setDefaultNumber, weightToEOS} from "../index";
import {locationCode} from "../../location_code/location_code";
import {IconAccounts, IconLink} from "../../svg";
import {Link} from "react-router-dom";

const locationCodes = {};
const locationAbbreviation = {};

locationCode.forEach(el => {
    locationCodes[el['country-code']] = el;
    locationAbbreviation[el['alpha-2']] = el;
});

function Producer(rank, {url, owner, total_votes, count_voters, producer_key}, {location, percentVote, dailyReward, eosWeight, avatar}){
    this.id = owner;
    this.rank = rank;
    this.url = url;
    this.owner = owner;
    this.location = location;
    this.total_votes = total_votes;
    this.percentVote = percentVote;
    this.dailyReward = dailyReward;
    this.producer_key = producer_key;
    this.count_voters = count_voters && +count_voters;
    this.eos_votes = eosWeight;
    this.avatar = avatar;
}

export const formProducersList = async (arr, new_tokens_by_blocks, new_tokens_by_vote, totalVoteWeight, token) => {
    let temp = arr
        .sort((a, b) => b.total_votes - a.total_votes)
        .map((el, index) => {
            let blocks_rewards = 0;

            if (index < 21) {
                blocks_rewards = (new_tokens_by_blocks / 20 * 8228) / 172800;
            }

            const vote_rewards = ((22980.2192 + (0.15 * new_tokens_by_vote)) * el.total_votes) / totalVoteWeight;
            const daily_reward = Number((blocks_rewards + vote_rewards).toFixed(0));
            const eosWeight = weightToEOS(el.total_votes);

            let jsonData = '';
            let avatar = '';
            let location =
            Number(el.location) && locationCodes[el.location]
                ? {flag: locationCodes[el.location]['alpha-2'].toLowerCase(), name: locationCodes[el.location].name}
                : '';

            try {
                jsonData = el.bp && el.bp.indexOf('<') < 0 ? JSON.parse(el.bp.split('\n').join('')) : false;
            } catch (err) {
                jsonData = false;
            }

            if (jsonData && jsonData.org) {
                avatar = jsonData.org.branding && jsonData.org.branding.logo_256;
                if(!location && typeof jsonData.org.location === 'string'){
                    location = {flag: '', name: jsonData.org.location};
                } else if(!location){
                    const code = jsonData.org.location.country;
                    const flag = locationAbbreviation[code] ? locationAbbreviation[code] : '';
                    location = {flag: code.toLowerCase(), name: flag.name};
                }
            }

            const percentVote = el.total_votes / totalVoteWeight * 100;
            const dailyReward = `${daily_reward >= 100 ? daily_reward : 0} ${token}`;

            return new Producer(index + 1, el, {location, percentVote, dailyReward, eosWeight, avatar});
        });

    const enabledProducers = temp
        .filter(el => (el.producer_key !== 'EOS1111111111111111111111111111111114T1Anm'))
        .map((el, index) => ({...el, rank: index + 1}));

    const disabledProducers = temp
        .filter(el => el.producer_key === 'EOS1111111111111111111111111111111114T1Anm' )
        .map((el,index) => ({...el, rank: index + enabledProducers.length}));

    return {
        activeProducers: enabledProducers.slice(0, 21),
        inactiveProducers: enabledProducers.slice(21, -1),
        disabledProducers
    };
};
