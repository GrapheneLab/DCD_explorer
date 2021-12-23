import React, {Component, Fragment} from 'react';
import Translate from "react-translate-component";
import Table, {EmptyTableMessage} from "../table/table";
import {awaitForResult, historyOperation} from "../../actions";
import Btn from "../helpers/btn";
import {cleanDoubles, formHistoryItems} from "../../actions/userActions";
import {IconFilter} from "../../svg";
import {PreLoader} from "../helpers/preloader";
import TableFilter from "./tableFilter";
import {historyDecorator} from "../../actions/tableDecoration";
import {allOps, spamTypeList, spamNameList} from '../../actions/historyHandlers/params';
import {defaultFilter} from "../../data/defaultHistoryFilter";
import {getAdditionalData} from "../../actions/getData/getAdditionalData";

const defaultState = {
    historyItems: '',
    filteredIds: [],
    lastSeq: '',
    typesList: [],
    showFilter: false,
    filter: ''
};

class AccountHistory extends Component {
    state = defaultState;

    componentDidMount() {
        const name = this.props.name;
        getAdditionalData(name)
            .then(result =>
                result.length
                    ? this.formData(result)
                    : this.setState({historyItems: []})
            );
    };

    hide = () => {
        const name = this.props.name;
        this.setState(defaultState, () => {
            awaitForResult(getAdditionalData(name))
                .then(result =>
                    result.length
                        ? this.formData(result)
                        : this.setState({historyItems: []}));
            });
    };

    showMore = () => {
        const historyItems = [...this.state.historyItems];
        const name = this.props.name;

        const lastPos = historyItems[historyItems.length - 1].seq;

        awaitForResult(getAdditionalData(name, lastPos - 1)).then(result => this.formData(result.slice(1,)));
    };

    formTypesList = (items, oldTypesList) => {

        return items.reduce((acc, elem) => {

            const type = elem.type;

            if (!acc.includes('custom') && !allOps.includes(type)) { acc.push('custom'); }
            else if (!acc.includes(type) && allOps.includes(type)) { acc.push(type); }

            return acc;
        }, oldTypesList);

    };

    formData = (history) => {

        const prevHistoryItems = this.state.historyItems;
        let {filter} = this.state;
        const userName = this.props.name;
        const newHistoryItems = history.length ? formHistoryItems(history, userName) : [];
        const historyItems = [...prevHistoryItems, ...newHistoryItems];
        const typesList = this.formTypesList(newHistoryItems, this.state.typesList);

        if (!filter) {
            const savedFilterParams = localStorage.getItem('filterData');
            filter = savedFilterParams ? JSON.parse(savedFilterParams) : {...defaultFilter};
            filter.activeTypes = typesList;
        }

        const filteredIds = this.filterData(historyItems, filter);

        this.setState({filteredIds, historyItems, typesList, filter})
    };

    handleFilter = (filter) => {
        const filteredIds = this.filterData([...this.state.historyItems], filter);
        this.setState({filteredIds, filter, showFilter: false});
    };

    filterData = (arr, filter) => {
        const {filterSpam, spamBorder, removeDoubles, activeTypes, removeSpam} = filter;

        const allIds = arr.map(elem => elem.id);
        let result = arr;

        if (activeTypes.length !== this.state.types) {
            result = result.filter(elem => {
                const type = elem.type;
                const inList = activeTypes.includes(type);

                if (activeTypes.includes('custom')) {
                    return !allOps.includes(type) || inList;
                }

                return inList;
            });
        }

        if(result.length) {
            if (removeSpam) result = result.filter(el => !spamTypeList.includes(el.type) && !spamNameList.includes(el.author));

            if (filterSpam) result = result.filter(elem => !['sent', 'receive'].includes(elem.type) || elem.data.transferred > spamBorder);

            if (removeDoubles) result = cleanDoubles(result);
        }

        result = result.map(elem => elem.id);

        return allIds.filter(elem => !result.includes(elem));
    };

    showFilter = () => this.setState({showFilter: !this.state.showFilter});

    render() {

        const historyItems = this.state.historyItems;

        if (historyItems.length === 0) {
            return !historyItems
                ? <PreLoader/>
                : <Fragment>
                    <div className="col-md-12 heading">
                        <Translate content="account.accountHistory"/>
                    </div>

                    <EmptyTableMessage pageName="account.history"/>
                </Fragment>;
        }


        const {filteredIds, typesList, filter, showFilter} = this.state;

        return (
            <Fragment>
                <div className="col-md-12 heading">
                    <Translate content="account.accountHistory"/>
                    <button className="card" onClick={this.showFilter} aria-label="history filter"><IconFilter/></button>
                </div>
                <TableFilter types={typesList} showFilter={showFilter} defaultParams={filter} handleFilter={this.handleFilter} />
                <Table
                    classNames={{
                        table: 'history-table'
                    }}
                    head={[
                        {key: 'seq', title: 'seq'},
                        {key: 'trx_id', title: 'operationID'},
                        {key: 'date', title: 'dateTime'},
                        {key: 'block', title: 'block'},
                        {key: 'type', title: 'type'},
                        {key: 'info', title: 'info'}
                    ]}
                    data={historyItems}
                    onEmpty="account.filter"
                    filteredIds={filteredIds}
                    decorate={historyDecorator}
                />

                {
                    historyItems.length - filteredIds.length && Number(historyItems[0].seq) !== historyItems.length
                        ? <div className="col-md-12 accounts__actions">
                            {historyItems.length > 100 &&
                                <Btn type='hide' className="text--md link--ghost upper" handleClick={this.hide}/>
                            }
                            <Btn type='showMore' className="text--md link--ghost upper"
                                 additionalData={` (${historyItems.length}/${historyItems[0].seq})`} handleClick={this.showMore}/>
                        </div>
                        : ''
                }
            </Fragment>
        )
    };

}

export default AccountHistory;
