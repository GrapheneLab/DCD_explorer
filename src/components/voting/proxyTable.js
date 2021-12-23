import React, {Component, Fragment} from 'react';
import {store} from "../../index";

import {awaitForResult, formatProxies} from "../../actions";
import Table from "../table/table";
import {changeVote} from "../../dispatch";
import {SearchBid} from "../helpers/searchLocal";
import Btn from "../helpers/btn";
import CheckBox from "../helpers/checkBox";
import {proxyDecorator} from "../../actions/tableDecoration";

const setProxy = (data) => store.dispatch(changeVote({type: 'proxy', data}));

class ProxyTable extends Component {
    state = {
        proxies: false,
        filteredIds: [],
        onlyRegistered: false
    };

    componentDidMount() {
        awaitForResult(formatProxies()).then(e => this.setState({proxies: e}));
    }

    filterTable = (value) => this.setState({
        onlyRegistered: false,
        filteredIds: this.state.proxies.filter(el => el['name'] !== value).map(e => e.id)
    });

    cancelFilter = () => this.setState({filteredIds: [], onlyRegistered: false});

    onlyRegistered = (e) => {

        let filteredIds = [];

        const proxies = this.state.proxies;
        const filter = e.target.checked;

        if(filter){
            filteredIds = proxies.filter(elem => !elem.registered).map(e => e.id);
        }

        this.setState({onlyRegistered: filter, filteredIds});
    };

    render() {
        const {proxies, onlyRegistered, filteredIds} = this.state;

        if (!proxies) {
            return <section className='container' />
        }

        let thead = [
            {key: 'rank', title: 'num'},
            {key: 'link', title: 'name', sort: 'name'},
            // {key: 'url'},
            {key: 'slave', title: 'slave'},
            {key: 'voters', title: 'votesForBP', sort: 'voters'},
            {key: 'vote_weight', title: 'proxyEffectiveWeight', sort: 'vote_weight'},
        ];

        let classNames = {
            table: 'text--grey producers-table radio-table'
        };

        return (
            <Fragment>
                <div className="accounts__header voting__tab-header">
                    <SearchBid
                        resultFunc={this.filterTable}
                        fields={['name']}
                        placeholder={`proxyTable`}
                        data={proxies.map(el => ({name: el['name'] }))}
                    />
                    <CheckBox id="filter" label="proxies.filter" value={onlyRegistered} onChange={this.onlyRegistered} />
                </div>

                {
                    proxies && proxies.length > 0 &&
                    <Table
                        head={thead}
                        data={proxies}
                        classNames={classNames}
                        decorate={proxyDecorator}
                        filteredIds={filteredIds}
                        onEmpty="producers.active"
                        checkboxParams={{fn: setProxy, index: 'id', type: 'proxy'}}
                    />
                }

                <div className="col-md-12 accounts__actions">
                    {
                        filteredIds.length > 0 &&
                        <Btn type='cancel' className="text--md link--ghost upper" handleClick={this.cancelFilter} />
                    }
                </div>
            </Fragment>
        )
    }
}

export default ProxyTable
