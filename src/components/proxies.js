import React, {Component} from 'react';

import {awaitForResult, formatProxies} from "../actions";

import Table from "./table/table";
import PageTitle from "./helpers/pageTitle";
import CheckBox from "./helpers/checkBox";
import {proxyDecorator} from "../actions/tableDecoration";

class Proxies extends Component {
    state = {
        proxiesList: false,
        filter: []
    };

    componentDidMount() {
        awaitForResult(formatProxies()).then(e => this.setState({proxiesList: e}));
    }

    handleFilter = (e) => {

        const proxiesList = this.state.proxiesList;

        const filter = e.target.checked
            ? proxiesList.filter(elem => !elem.registered).map(elem => elem.id)
            : [];

        this.setState({filter});
    };

    render() {
        const {proxiesList, filter} = this.state;

        if (!proxiesList) {
            return <section className='container'/>
        }

        let thead = [
            {key: 'rank', title: 'num'},
            {key: 'link', title: 'name', filter: 'name'},
            {key: 'url', title: 'url'},
            {key: 'slave', title: 'slave', filter: 'slave'},
            {key: 'voters', title: 'votesForBP', filter: 'voters'},
            {key: 'vote_weight', title: 'proxyEffectiveWeight'},
        ];

        let classNames = {
            table: 'text--grey producers-table'
        };

        return (
            <section className='container'>
                <div className="col-md-12 accounts__header">
                    <PageTitle pageName="proxies"/>
                    {proxiesList &&
                        <CheckBox id="filter" label="proxies.filter" value={this.state.filter.length > 0} onChange={this.handleFilter} />
                    }
                </div>
                {proxiesList &&
                    <Table decorate={proxyDecorator} head={thead} data={proxiesList} filteredIds={filter} classNames={classNames} onEmpty="proxies"/>
                }
            </section>
        )
    }
}

export default Proxies
