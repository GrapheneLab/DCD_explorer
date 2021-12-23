import React, { Component } from 'react';
import Textarea from "./helpers/textarea";
import Translate from "react-translate-component";
import PageTitle from "./helpers/pageTitle";
import BtnLink from "./helpers/btnLink";
import {awaitForResult} from "../actions/awaitForResult";
import {chainOperation} from "../actions";

class Broadcast extends Component{

    state = {
        showResultMessage: false,
        formData: {},
        errors: {}
    };

    getVal = (val, idName) => {
        let formData = this.state.formData;
        let errors = {};

        formData[idName] = val;

        this.setState({formData, errors});
    };

    submit = (e) => {
        e.preventDefault();

        const transaction = this.state.formData.transaction;
        const requiredParams = ['expiration', 'ref_block_num', 'ref_block_prefix'];

        let errors = {};

        for(let i = 0; i < requiredParams.length; i++){
            const param = requiredParams[i];

            if(transaction.indexOf(param) === -1){
                errors = {transaction: {type: 'requiredParameter', param: param}};
                this.setState({ errors });
                return;
            }
        }

        const raw_transaction = JSON.parse(transaction);

        awaitForResult(

            chainOperation('push_transactions', {body: raw_transaction}).then(result => {

                let errors = {transaction: {type: 'somethingWrong'}},
                    showResultMessage = false;

                if(result.transaction_id){
                    errors = {};
                    showResultMessage = true;
                }

                return {showResultMessage, errors};
            })
        ).then(result => {
            const {showResultMessage, errors} = result;
            this.setState({showResultMessage, errors});
        });
    };

    render(){

        const {showResultMessage, errors, formData} = this.state;

        return (
            <div className="broadcast container">
                <div className="col-md-12">
                    <PageTitle pageName="broadcast" />
                </div>
                {!showResultMessage
                    ? <form className="broadcast__form col-md-12" onSubmit={this.submit}>
                        <Textarea id="transaction" placeholder="broadcast.textarea" getVal={this.getVal} errors={errors}/>
                        <Translate content="buttons.push" component="button" className="btn--gradient" disabled={!formData.transaction} />
                    </form>
                    : <div className="broadcast__result col-md-12">
                        <Translate content="broadcast.result" component="p" className="text--lg" />
                        <BtnLink type="toDashboard" className="btn--gradient" />
                    </div>
                }
            </div>
        )
    }
}

export default Broadcast
