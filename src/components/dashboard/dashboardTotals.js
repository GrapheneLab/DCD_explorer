import React, {Component} from 'react';
import {connect} from "react-redux";
import Translate from "react-translate-component";
import {awaitForResult} from "../../actions/awaitForResult";
import {IconStar, IconTrx} from "../../svg";
import {IconAccounts} from "../icons";
import {coreToken} from "../../reducers";
import {PreLoader} from "../helpers/preloader";
import {getTotals} from "../../actions/getData/getTotals";

const emptyStatisticData = () => {
    let storageValues = localStorage.getItem('totals');

    if(storageValues) return JSON.parse(storageValues);

    return {
        totals: {
            account: "",
            action: "",
            ram_usage: "",
            transaction: "",
            voters: "",
        },
        votesStats: {
            supply: 0,
            vote_staked: 0
        }
    }
};

class DashboardTotals extends Component {
    state = {
        votesStats: emptyStatisticData().votesStats,
        info: false,
        totals: emptyStatisticData().totals
    };

    componentDidMount() {
        let token = this.props.token || 'EOS';
        awaitForResult(getTotals(token, emptyStatisticData)).then(e => {
            const interval = setInterval(() => {
                getTotals(token, this.state.totals).then(e => this.setState(e))
            }, 3000);

            this.setState({...e, interval});
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const {totals, votesStats} = this.state;
        const {token} = this.props;

        let votePercent = '0',
            voteTotals = '0';

        if(votesStats && votesStats.supply){
            votePercent = (votesStats.vote_staked/votesStats.supply * 100).toFixed(2);
            voteTotals = Math.floor(votesStats.vote_staked).toLocaleString('ru-RU');
        }

        const totalsValue = [
            {content: 'account', icon: <IconAccounts className='ico totals__ico'/>},
            {content: 'transaction', icon: <IconTrx className='ico totals__ico'/>},
            {content: 'action', icon: <IconStar className='ico totals__ico'/>},
        ];

        return (
            <div className="col-md-8 dashboard__totals">
                <div className="voting__progress">
                    <div className="card">
                        <div className='text--lg voting__percent'>
                            <span className="title text--xs">
                                <Translate content="dashboard.votingProgress" />:
                            </span> {votePercent}%
                        </div>
                        <div className='text--lg voting__percent'>
                            <span className="title text--xs">
                                <Translate content="dashboard.voters" />:
                            </span> {
                                !totals
                                    ? <PreLoader />
                                    : totals.voters
                                        ? Number(totals.voters).toLocaleString('ru-RU')
                                        : <Translate content='global.notActualData' />
                            }
                        </div>
                        <span className="text--lg voting__total">{voteTotals} {token ? token: ''}</span>
                        <div className="voting__scale">
                            <span className='value' style={{width: `${votePercent}%`}}/>
                        </div>
                    </div>
                </div>
                <div className="totals__row">
                    {totalsValue.map(el =>
                        <div className="totals__item" key={el.content}>
                            <div className="card">
                                <span className='title totals__title text--xs'>
                                    <Translate content={`dashboard.${el.content}`} />
                                </span>
                                <span className="ico__wrapper">{el.icon}</span>
                                <span className='text--lg totals__num'>
                                {
                                    !totals
                                        ? <PreLoader />
                                        : totals[el.content]
                                        ? Number(totals[el.content]).toLocaleString('ru-RU')
                                        : <Translate content='global.notActualData' />
                                }
                            </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: coreToken(state),
});

export default connect(mapStateToProps)(DashboardTotals)
