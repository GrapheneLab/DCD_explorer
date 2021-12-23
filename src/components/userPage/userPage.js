import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Translate from "react-translate-component";

import {accountInfo, awaitForResult} from "../../actions";
import {coreToken, price} from "../../reducers";
import {Key} from "../helpers/key";
import AccountHistory from "./accountHistory";
import {VoterInfo} from "./voterInfo";
import {AccountResource} from "./accountResource";
import {UserRegaly} from "./regaly";
import Balance from "./balance";
import {AccountHeader} from "./accountHeader";
import {UserTabs} from "./userChildrenTabs";
import CustomTokens from "./customTokens";

class UserPage extends Component {
    state = {
        data: '',
        history: ''
    };

    fetchInfo = (name) => {
        awaitForResult(accountInfo(name))
            .then(data => {
                if(!data) return this.props.history.replace('/404/');
                this.setState({data});
            });
    };

    componentDidMount() {
        this.fetchInfo(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        const newName = props.match.params.name;
        if (newName !== this.props.match.params.name) {
            window.scrollTo(0, 0);
            this.setState({data: ''});
            this.fetchInfo(newName);
        }
    }

    render() {
        const data = this.state.data;
        let symbol = this.props.token || '';

        if (!data) return <p/>;

        const {
            name,
            created,
            creator,
            avatar,
            site,
            socials
        } = data.info;

        const isProducer = data.producerData;
        const isProxy = data.votingData.isProxy;
        const isContract = data.properties.isSmartContract;
        const userKeys = data.keysList.userKeys;

        return (
            <section className='container personal__page'>
                <div className="col-md-12">
                    <h2 className="heading">
                        <Translate content="account.title"/>
                        <UserRegaly userName={name} producer={isProducer} contract={isContract} socials={socials} proxy={isProxy}/>
                    </h2>
                </div>
                <div className="col-lg-6">
                    <div className="card personal__card">
                        <AccountHeader name={name} avatar={avatar} url={site} created={created} creator={creator}/>
                        {userKeys.type === 'keys'
                            ? <Fragment>
                                <Key title='activeKey' data={userKeys.data.activeKey}/>
                                <Key title='ownerKey' data={userKeys.data.ownerKey}/>
                              </Fragment>
                            : <Key title='multisig' data={userKeys.data}/>
                        }
                        {isProducer &&
                            <Key title="producerKey" data={data.keysList.producerKey}/>
                        }
                    </div>
                </div>
                <div className="col-lg-6">
                    <Balance producer={data.producerData} balance={data.balances} token={symbol} />
                </div>

                { data.resources && <AccountResource data={data.resources}/> }

                <CustomTokens name={name} />

                { data.votingData && <VoterInfo data={data.votingData}/> }

                <UserTabs data={data} />

                {/*<AccountHistory name={this.props.match.params.name}/>*/}

            </section>
        )
    }
}

const mapStateToProps = state => ({
    token: coreToken(state),
    price: price(state)
});

export default connect(mapStateToProps)(UserPage);
