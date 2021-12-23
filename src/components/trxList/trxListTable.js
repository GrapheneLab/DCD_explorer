import React, {Component, Fragment} from 'react';
import Table from "../table/table";
import Btn from "../helpers/btn";
import {awaitForResult} from "../../actions/awaitForResult";
import {getTransactionsList, refreshTrxList} from "../../actions/getData/getTransactionsList";
import {trxListDecorator} from "../../actions/tableDecoration/trxListDecorator";
import Translate from "react-translate-component";
import {PreLoader} from "../helpers/preloader";

class TrxListTable extends Component {
    state = {
        transactions: false,
    };

    componentDidMount(){
        this.getInitialData();
    }

    getInitialData = () => {
        awaitForResult(getTransactionsList()).then(transactions => this.setState({transactions}))
    };

    showMore = () => {
        const transactions = [...this.state.transactions];
        const lastTrx = transactions[transactions.length - 1];

        awaitForResult(
            getTransactionsList(lastTrx.account_action_seq)
        ).then(result => {
            this.setState({
                transactions: [...transactions, ...result]
            })
        })
    };

    refresh = () => {
        this.setState({transactions: false}, () => {
            getTransactionsList().then(transactions => this.setState({transactions}));
        })
    };

    render() {

        const {transactions} = this.state;

        let content = <PreLoader/>;

        if(transactions){
            let thead = [
                {key: 'block', title: 'block'},
                {key: 'created', title: 'creationDate'},
                {key: 'trx_id', title: 'transactionID'},
                {key: 'type', title: 'type'},
                {key: 'info', title: 'info'},
            ];

            let classNames = {
                table: 'text--grey'
            };

            content = <Table
                head={thead}
                data={transactions}
                classNames={classNames}
                onEmpty="account.filter"
                decorate={trxListDecorator}
            />
        }

        return (
           <Fragment>
               <div className="col-md-12 accounts__header">
                   <h2 className="heading">
                       <Translate content="transactions.lastTrx" />
                   </h2>
                   <Translate
                       content="transactions.refresh"
                       container="button"
                       className="transactions__refresh"
                       onClick={this.refresh}
                   />
               </div>
               {content}
               {transactions.length && transactions.length % 50 === 0
                   ? <div className="col-md-12 accounts__actions">
                       <Btn type='showMore' className="text--md link--ghost upper" handleClick={this.showMore} />
                   </div>
                   : ''
               }
           </Fragment>
        )
    }
}

export default TrxListTable;
