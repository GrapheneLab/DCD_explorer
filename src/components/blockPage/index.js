import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";
import Translate from "react-translate-component";

import {awaitForResult, chainOperation} from "../../actions/";
import {BlockHeader} from "./blockHeader";
import {BlockProducerCard} from "./blockProducer";
import {BlockTrxList} from "./blockTrxList";

const getData = async (block_num_or_id) => {
    let data = await chainOperation('get_block', {block_num_or_id}).then(e => e);
    const irr = await chainOperation('get_info').then(e => e.last_irreversible_block_num);

    if(!data) return false;

    data['actions_count'] = data.transactions.reduce((ac,cur) => cur.trx.transaction ? ac + cur.trx.transaction.actions.length : ac, 0);
    data.is_irreversible = data.block_num < irr;

    return {data}
};

class BlockPage extends Component {
    state = {
        data: false,
        redirect: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        awaitForResult(getData(id)).then(e => e ? this.setState(e) : this.setState({redirect: true}));
    }

    componentWillReceiveProps(props){
        const id = props.match.params.id;
        const oldId = this.props.match.params.id;
        if(id !== oldId){
            awaitForResult(getData(id)).then(e => e ? this.setState(e) : this.setState({redirect: true}));
        }
    }

    render() {
        const {data, redirect} = this.state;

        if(redirect) return <Redirect push to='/404/'/>;

        if (!data) return '';

        return (
            <section className="container block-page">
                <h2 className="heading col-md-12">
                    <Translate content="blockPage.title" with={{num:
                        <Fragment>
                            <span className='num'>{data.block_num}</span>
                            <span className="text--xs block__id wrap">{data.id}</span>
                        </Fragment>
                    }}/>
                    {data.is_irreversible &&
                        <div className="trx__status-wrapper text--sm">
                            <Translate content={`trxPage.status.irreversible`} className={`trx__status irreversible`}/>
                        </div>
                    }
                </h2>
                <div className="col-lg-7">
                    <BlockHeader data={data} />
                </div>
                <div className="col-lg-5">
                    <BlockProducerCard name={data.producer} signature={data.producer_signature}/>
                </div>
                <BlockTrxList data={data.transactions}/>
            </section>
        )
    }
}

export default BlockPage;
