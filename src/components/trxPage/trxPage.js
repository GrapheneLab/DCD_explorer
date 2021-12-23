import React, {Component} from 'react';
import Translate from "react-translate-component";
import {awaitForResult} from "../../actions/";
import Tabs from "../helpers/tabs";
import ActionTable from "./actionTable";
import TokensTable from "./tokensTable";
import ShowRawData from "../helpers/showRawData";
import TracesTable from "./tracesTable";
import {formatTrxData} from "../../actions/formatted/formatTrxData";
import {TrxBlock} from "./trxBlock";
import {TrxInfo} from "./trxInfo";
import {getData, getSchedule} from "../../actions/getData/getTrx";
import {TrxStatus} from "./trxStatus";

class TrxPage extends Component {
    state = {
        info: false,
    };

    redirect = () => this.props.history.push('/404/');

    getFromTable = (id) => {
        awaitForResult(getSchedule(id))
            .then(e => e.transactions && e.transactions.length
                ? this.setState({info: e.transactions[0]})
                : this.redirect()
            )
            .catch(() => this.redirect())
    };

    getTrx = (id) => {
        awaitForResult(getData(id))
            .then(e => e
                ? this.setState({info: e})
                : this.getFromTable(id)
            )
            .catch(() => this.getFromTable(id));
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getTrx(id);
    }

    componentWillReceiveProps(props){
        const id = this.props.match.params.id;
        const newId = props.match.params.id;

        if(newId !== id) this.getTrx(newId);
    }

    render() {

        const {info} = this.state;

        if(!info){
            return <section className="container trx-page">
                <h2 className="heading col-md-12">
                    <Translate content="global.loader" />
                </h2>
            </section>
        }

        const {blockTime, expTime, def, actNum, status, cpu, net} = formatTrxData(info);
        const {transaction, trx, traces, id, block_num} = info;

        let tabsTitles = ['rawData'],
            tabs = [<ShowRawData data={info} />];

        if(info.transaction){
            tabsTitles = ['actionsInfo', ...tabsTitles];
            tabs = [
                <ActionTable data={transaction && transaction.actions} />,
                ...tabs
            ];
        }

        if(trx){
            tabsTitles = ['actionsInfo', 'tokensTransfer', 'tracesInfo', ...tabsTitles];
            tabs =  [
                <ActionTable data={trx.trx ? trx.trx.actions : []} />,
                <TokensTable data={traces ? traces : []} />,
                <TracesTable data={traces ? traces : []} />,
                ...tabs
            ];
        }

        return (
            <section className="container trx-page">
                <h2 className="heading col-md-12">
                    <Translate content="trxPage.title" className='trx__title'/>
                    <TrxStatus status={status} time={blockTime}/>
                </h2>
                <div className="col-md-7">
                    <TrxInfo id={id} cpu={cpu} net={net} actions={actNum} deferred={def}/>
                </div>
                <div className="col-lg-5">
                    <TrxBlock block={block_num} blockTime={blockTime} expireTime={expTime}/>
                </div>
                <Tabs title="trxPage.actions" tabsTitles={tabsTitles}>
                    {tabs}
                </Tabs>
            </section>
        )
    }
}

export default TrxPage;
