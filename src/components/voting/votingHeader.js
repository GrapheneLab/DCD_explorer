import React, {Component, Fragment} from 'react';
import Eos from "eosjs";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Translate from "react-translate-component";

import {reduxUser, reduxVoting} from "../../reducers";
import {changeVote} from "../../dispatch";

import UserProdList from "../userPage/userProdList";
import {voteProducer} from "../../actions/scatter/scatterTrx";

class VotingHeader extends Component {

    state = {
        auth: false,
        connect: false,
        trxMessage: false,
        error: false
    };

    componentDidMount() {
        if(this.props.user){
            return this.setState({connect: true, auth: true})
        }

        this.connectScatter();
    }

    componentWillReceiveProps(props){
        if(props.user) return this.setState({connect: true, auth: true});
    }

    removable = (data) => {
        this.props.changeVote({type: 'producers', data});
    };

    voting = () => {
        const {proxy, producers} = this.props.voting;
        const account = this.props.user;

        voteProducer(account, proxy, producers.sort())
            .then(tx => this.setState({trxMessage: {type: 'success', link: tx.transaction_id}}))
            .catch(err => {
                let type = JSON.parse(err).error ? JSON.parse(err).error.name : err.type;
                this.setState({trxMessage: {type}, error: true})
            });
    };

    render(){
        const {auth, trxMessage, error} = this.state;
        const {proxy, producers} = this.props.voting;
        return (
            <Fragment>
                <div className="col-md-12 voting__header">
                    <Translate component='h2' className='heading' content='voting.title'/>
                </div>
                {(proxy || producers.length > 0) &&
                <div className="col-md-12">
                    <div className="card voting__info">
                        {(!proxy && producers.length > 0) &&
                            <div>
                                <UserProdList data={producers} removable={this.removable}/>
                            </div>
                        }

                        {proxy &&
                        <p className="text--lg text--grey">Proxy set: <Link to={`/accounts/${proxy}`} className='text--light link--ghost'>{proxy}</Link></p>
                        }

                        {auth
                            ? <Translate component='button' content={`buttons.${proxy ? 'proxy' : 'voted'}`} className="btn--gradient" onClick={this.voting} />
                            : <Translate component='button' content='buttons.auth' className="btn--gradient" onClick={this.auth} />
                        }
                    </div>
                </div>
                }

                {trxMessage &&
                <div className="col-md-12">
                    <div className={`card voting__trx-msg${!error ? ' success' : ' error'}`}>
                        <Translate content={`voting.${!error ? 'successTitle' : 'errorTitle'}`} component='p' className={`text--lg${!error ? ' success' : ' error'}`}/>
                        {!error &&
                            <Translate component='p'
                                       className={`text--md text--grey`}
                                       content={`voting.trxMessage`}
                                       with={{link: <Link to={`/trx/${trxMessage.link}`} className='text--light link--ghost'> {trxMessage.link}</Link>}}
                            />
                        }
                    </div>
                </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: reduxUser(state),
    voting: reduxVoting(state)
});

export default connect(mapStateToProps, {changeVote})(VotingHeader)
