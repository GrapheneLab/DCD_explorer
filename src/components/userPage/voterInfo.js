import React from 'react';
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import {addNumSpaces, EOStoWeight, setDefaultNumber} from "../../actions";
import {weightToEOS} from "../../actions/getData/getVoteWeight";
import Tooltip from "../helpers/tooltip";

export const VoterInfo = ({data}) => {
    const {
        staked,
        proxy,
        voters,
        weight,
        isProxy,
        countVoters,
        proxied_vote_weight,
        totalProxyEOS
    } = data;

    const weightEOS = Number(weightToEOS(weight - proxied_vote_weight));
    const weightProxyEOS = Number(weightToEOS(proxied_vote_weight));
    const effectivityVotes = staked ? (weightEOS / staked * 100).toFixed(2) : 0;
    const effectivityProxyVotes = totalProxyEOS ? (weightProxyEOS / totalProxyEOS * 100).toFixed(2) : 0;
    const decay = (100 - effectivityVotes).toFixed(2);
    const decayProxy = (100 - effectivityProxyVotes).toFixed(2);
    const emptyVoting = Number(effectivityVotes) !== 0 && !(!proxy && voters.length === 0);

    return (
        <div className='personal__voting'>
            <Translate content="account.vote" component="h2" className='col-md-12 heading'/>
            <div className="row">
                <div className="col-md-6 voted__wrapper">
                    {emptyVoting
                        ? <div className="card personal__voted">
                            <span className='text--md'>
                                <Tooltip text='tooltip.totalEffectiveVotes'><Translate content="account.voteWeightTotal" className='title'/></Tooltip>
                                {addNumSpaces(staked)}
                            </span>
                            <span className='text--md'>
                                <Tooltip text='tooltip.effectiveVotes'><Translate content="account.voteWeightEOS" className='title'/></Tooltip>
                                {addNumSpaces(weightEOS)} {decay > 0 && decay < 100 ? <span className='text--danger nowrap'>( -{decay}% )</span> : ''}
                            </span>
                            <div className="voting__scale">
                                <span className='value' style={{width: `${effectivityVotes}%`}}/>
                            </div>
                        </div>
                        : <div className="card personal__voted">
                            <Translate content="account.emptyVoting.title" className='text--md title'/>
                            <Translate content="account.emptyVoting.message" className='text--md text--grey lower'
                                       link={<Translate component={Link} to='/tools/voting' content="account.emptyVoting.link" className='text--light link--ghost'/>}
                            />
                        </div>
                    }
                </div>
                <div className="col-md-6 voted__wrapper">
                    <p className="card personal__voted text--md">
                        <Translate content="account.voteWeight" className='title'/>
                        {setDefaultNumber(weight)}
                    </p>
                    <p className="card personal__voted text--md">
                        <Translate content="account.proxySet" className='title'/>
                        {
                            proxy
                                ? <Link className="link--ghost" to={`/accounts/${proxy}`}>{proxy}</Link>
                                : <Translate content="account.none"/>
                        }
                    </p>
                </div>
            </div>
            {
                isProxy &&
                <div className="row">
                    <div className="col-md-6 voted__wrapper">
                        <div className="card personal__voted">
                            <span className='text--md'>
                                <Translate content="account.proxyWeightTotal" className='title'/>
                                {addNumSpaces(totalProxyEOS)}
                            </span>
                            <span className='text--md'>
                                <Translate content="account.proxyWeightEOS" className='title'/>
                                {addNumSpaces(weightProxyEOS)} {decayProxy > 0 && decayProxy < 100 ? <span className='text--danger nowrap'>( -{decayProxy}% )</span> : ''}
                            </span>
                            <div className="voting__scale">
                                <span className='value accent' style={{width: `${effectivityProxyVotes < 100 ? effectivityProxyVotes : 100 }%`}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 voted__wrapper">
                        <p className="card personal__voted text--md">
                            <Translate content="tableHead.proxyVoteWeight" className='title'/>
                            {setDefaultNumber(proxied_vote_weight)}
                        </p>
                        <p className="card personal__voted text--md">
                            <Translate content="account.proxyCount" className='title'/>
                            {countVoters}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
};
