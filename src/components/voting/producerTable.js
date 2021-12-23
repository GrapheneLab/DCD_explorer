import React, {Component, Fragment} from 'react';

import {awaitForResult, getProducers} from "../../actions";
import Table from "../table/table";
import {changeVote} from "../../dispatch";
import {store} from "../../index";
import {SearchBid} from "../helpers/searchLocal";
import Btn from "../helpers/btn";
import {producersDecor} from "../../actions/tableDecoration";

const changeProducer = (data) => store.dispatch(changeVote({type: 'producers', data}));

class ProducersTable extends Component {
    state = {
        data: false,
        filteredProds: []
    };

    componentDidMount() {
        awaitForResult(getProducers())
            .then(e => {
                this.setState({
                    data: [...e.activeProducers, ...e.inactiveProducers]
                })
            });
    }

    filterTable = (value) => {
        this.setState({
            filteredProds: this.state.data.filter(el => el['owner'] !== value).map(e => e.id)
        });
    };

    cancelFilter = () => {
        this.setState({ filteredProds: [] })
    };

    render() {
        const {data, filteredProds} = this.state;

        if (!data) {
            return <section className='container' />
        }

        let thead = [
            {key: 'rank', title: 'num'},
            {key: 'link', title: 'name', sort: 'owner'},
            {key: 'url', title: 'url'},
            {key: 'location', title: 'location'},
            {key: 'count_voters', title: 'countVoters', sort: 'count_voters'},
            {key: 'eos_votes', title: 'eosVotes', sort: 'eos_votes'},
        ];

        let classNames = {
            table: 'text--grey producers-table'
        };

        let sort = [
            {key: 'owner', title: 'name'},
            {key: 'count_voters'},
            {key: 'eos_votes'}
        ];

        return (
            <Fragment>
                <div className="accounts__header">
                    <SearchBid
                        resultFunc={this.filterTable}
                        fields={['name']}
                        placeholder={`producerTable`}
                        data={data.map(el => ({name: el['owner'] }))}
                    />
                </div>

                <Table
                    head={thead}
                    data={data}
                    classNames={classNames}
                    decorate={producersDecor}
                    filteredIds={filteredProds}
                    onEmpty="producers.active"
                    checkboxParams={{fn: changeProducer, index: 'id', type: 'producers'}}
                />

                <div className="col-md-12 accounts__actions">
                    {
                        !!filteredProds.length &&
                        <Btn type='cancel' className="text--md link--ghost upper" handleClick={this.cancelFilter} />
                    }
                </div>

            </Fragment>
        )
    }
}

export default ProducersTable
