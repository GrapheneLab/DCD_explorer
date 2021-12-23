import React, { Component } from 'react';
import {connect} from "react-redux";

import {awaitForResult, getBackendData, chainOperation} from "../actions";
import {coreToken} from "../reducers";

import Table from "./table/table";
import PageTitle from "./helpers/pageTitle";
import Btn from "./helpers/btn";
import {accountsDecor} from "../actions/tableDecoration";

const getAccsFromBlockChain = async (lastPos = "") => {

    const limit = lastPos ? 51 : 50;

    const params = {
        json: true,
        code: "eosio",
        scope: "eosio",
        lower_bound: lastPos,
        table: "voters",
        upper_bound: '',
        limit
    };

    return await chainOperation('get_table_rows', params).then(e => {
        const data = lastPos ? e.rows.slice(1,) : e.rows;

        return Promise.all(
            data.map(async (el, index) => chainOperation('get_account', {account_name: el.owner})
                .then(({account_name, core_liquid_balance, created}) => ({
                        id: lastPos ? lastPos + index + 1 : index + 1,
                        name: account_name,
                        balance: core_liquid_balance ? core_liquid_balance.split(' ')[0] : 0,
                        date_creation: created,
                        create_by: ''
                    })
            ))
        )
    })
};

const getAccounts = async (arr = []) => {
    // return await getBackendData('gul', {boundary: arr.length, offset: 50})
    //     .then(result => result.map((el, index) => ({
    //         id: arr.length + index + 1,
    //         ...el
    //     })))
    //     .catch(() => {
            let lastPos = '';
            if(arr.length){
                lastPos = arr[arr.length - 1].owner.props.children;
            }
            return getAccsFromBlockChain(lastPos);
        // });
};

class Accounts extends Component {
    state = {
        userList: false,
        count: 0
    };

    componentDidMount(){
        this.getDefaultData();
        // getBackendData('gth').then(result => this.setState({count: result.account}));
    }

    getDefaultData = () => awaitForResult(getAccounts()).then(e => this.setState({userList: e}));

    showMore = () => {
        let arr = this.state.userList;

        awaitForResult(getAccounts(arr))
            .then(moreList => this.setState({userList: arr.concat(moreList)}))
    };

    hide = () => this.setState({userList: false}, () => this.getDefaultData());

    render() {
        const {userList, count} = this.state;

        if (!userList){
            return <section className='container' />
        }

        let thead = [
            {key: 'id', title: 'rank'},
            {key: 'owner', title: 'name'},
            {key: 'balance', title: 'balance'},
            {key: 'create_at', title: 'creationDate'},
            {key: 'create_by', title: 'createdBy'},
        ];

        let classNames = {
            wrapper: "text--grey accounts-table",
        };

        return (
            <section className='container'>
                <div className="col-md-12 accounts__header">
                    <PageTitle pageName="accounts" />
                </div>
                <Table head={thead} data={userList} classNames={classNames} decorate={accountsDecor} onEmpty="accounts" />
                {userList.length && userList.length % 50 === 0
                    ? <div className="col-md-12 accounts__actions">
                        {userList.length > 50 &&
                            <Btn type='hide' className="text--md upper link--ghost" handleClick={this.hide}/>
                        }
                        <Btn type='showMore' className="text--md link--ghost upper" handleClick={this.showMore}
                            additionalData={` (${userList.length}/${count})`}
                        />
                    </div>
                    : ''
                }
            </section>
        )
    }
}

const mapStateToProps = state => ({
    token: coreToken(state),
});

export default connect(mapStateToProps)(Accounts)
