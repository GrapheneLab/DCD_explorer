import React, {Component} from 'react';
import Translate from "react-translate-component";

import {awaitForResult} from "../actions";

import Table from "./table/table";
import PageTitle from "./helpers/pageTitle";
import {getProducers} from "../actions/producers/getProducers";
import {producersDecor} from "../actions/tableDecoration";

class Producers extends Component {
    state = {
        activeProducers: false,
        inactiveProducers: false,
        disabledProducers: false
    };

    componentDidMount() {
        awaitForResult(getProducers()).then(e => this.setState(e));
    }

    render() {
        const {activeProducers, inactiveProducers, disabledProducers} = this.state;

        if (!activeProducers) {
            return <section className='container' />
        }

        let thead = [
            {key: 'rank', title: 'num'},
            {key: 'link', title: 'name'},
            {key: 'url', title: 'url'},
            {key: 'location', title: 'location'},
            // {key: 'total_votes', title: 'totalVotes'},
            {key: 'count_voters', title: 'countVoters'},
            {key: 'eos_votes', title: 'eosVotes'},
            {key: 'percentVote', title: 'percentVote'},
            {key: 'dailyReward', title: 'dailyReward'},
        ];

        let classNames = {
            table: 'text--grey producers-table'
        };

        let disabledTableClass = {
            table: 'text--grey producers-table disabled'
        };

        return (
            <section className='container'>
                <div className="col-md-12 accounts__header">
                    <PageTitle pageName="producers"/>
                </div>
                <Translate content="producers.active" component="p" className="title col-md-12"/>
                {activeProducers &&
                    <Table head={thead} decorate={producersDecor} data={activeProducers} classNames={classNames} onEmpty="producers.active" />
                }
                <Translate content="producers.standby" component="p" className="title col-md-12"/>
                {inactiveProducers &&
                    <Table head={thead} decorate={producersDecor} data={inactiveProducers} classNames={classNames} onEmpty="producers.standby"/>
                }
                <Translate content="producers.disabled" component="p" className="title col-md-12"/>
                {disabledProducers &&
                    <Table head={thead} decorate={producersDecor} data={disabledProducers} classNames={disabledTableClass} onEmpty="producers.disabled"/>
                }
            </section>
        )
    }
}

export default Producers
