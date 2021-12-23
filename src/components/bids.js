import React, { Component } from 'react';
import {getBids} from "../actions";
import {DefaultTable} from "./table/table";
import Btn from "./helpers/btn";
import {awaitForResult} from "../actions/awaitForResult";
import PageTitle from "./helpers/pageTitle";
import {SearchBid} from "./helpers/searchLocal";
import {bidDecor} from "../actions/tableDecoration";

class Bids extends Component {
    state = {
        totalBidsList: false,
        topBids: false,
        bidsList: false
    };

    componentDidMount(){
        awaitForResult(
            getBids().then(
                e => {
                    const totalBidsList = e.map((el,id) => ({
                        ...el,
                        id: id+1,
                        name: bidDecor.name(el.newname),
                        high_bid: bidDecor.high_bid(el.high_bid),
                        bidder: bidDecor.bidder(el.high_bidder),
                        last_bid: bidDecor.last_bid(el.last_bid_time)
                    }));
                    return {totalBidsList, bidsList: totalBidsList.slice(0, 100)}
                }
            )
        ).then(result => {
            this.setState({
                totalBidsList: result.totalBidsList,
                bidsList: result.bidsList,
                topBids: result.bidsList
            })
        });
    }

    showMore = () => {
        const { totalBidsList, bidsList } = this.state;

        const newVal = totalBidsList.slice(bidsList.length, bidsList.length + 100);

        const newBidsList = bidsList.concat(newVal);

        this.setState({bidsList: newBidsList})
    };

    filterTable = (value) => {
        this.filter(
            this.state.totalBidsList.filter(el => el['newname'] === value || el['high_bidder'] === value)
        );
    };

    cancelFilter = () => this.filter(this.state.totalBidsList.slice(0, 100));

    filter = (bidsList) => { this.setState({ bidsList }) };

    render() {
        const { bidsList, totalBidsList, topBids } = this.state;

        if(!bidsList) return <section className='container' />;

        const thead = [
            {key: 'id', title: 'rank'},
            {key: 'name', title: 'name'},
            {key: 'high_bid', title: 'highBid'},
            {key: 'bidder', title: 'bidder'},
            {key: 'last_bid', title: 'lastBid'}
        ];

        const classNames = {
            table: 'text--grey producers-table'
        };

        return (
            <section className='container'>
                <div className="col-md-12 accounts__header">
                    <PageTitle pageName="bids" />
                    <SearchBid
                        resultFunc={this.filterTable}
                        fields={['name', 'bidder']}
                        placeholder={`bid`}
                        data={totalBidsList.map(el => ({name: el['newname'], bidder: el['high_bidder'] }))}
                    />
                </div>

                <DefaultTable
                    head={thead}
                    data={bidsList}
                    filtered={bidsList.map(el => !el.id)}
                    classNames={classNames}
                    onEmpty="bids"
                />

                <div className="col-md-12 accounts__actions">
                    {
                        bidsList.length !== topBids.length &&
                        <Btn type='cancel' className="text--md link--ghost upper" handleClick={this.cancelFilter} />
                    }
                    {
                        bidsList && !!bidsList.length && bidsList.length % 100 === 0 &&
                        <Btn type='showMore' className="text--md link--ghost upper" handleClick={this.showMore} />
                    }
                </div>
            </section>
        )
    }
}

export default Bids;
