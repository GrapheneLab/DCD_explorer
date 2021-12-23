import React, {Component} from 'react';
import {connect} from "react-redux";
import Translate from "react-translate-component";
import Tabs from "../helpers/tabs";
import ProxyTable from "./proxyTable";
import ProducersTable from "./producerTable";
import {reduxScatter, reduxUser} from "../../reducers";

import VotingHeader from './votingHeader';
import {scatterIdentity} from "../../actions/scatter/scatterIdentity";


class VotingTools extends Component {
    state = {
        connect: false,
    };

    componentDidMount() { this.checkConnect(this.props) }

    componentWillReceiveProps(props){ this.checkConnect(props) }

    checkConnect = (props) => {
        const connect = Boolean(props.user);
        if(connect !== this.state.connect) this.setState({connect})
    };

    auth = () => {
        const {scatter, user} = this.props;

        if(scatter.connect && !user){
            scatterIdentity().then(() => this.setState({connect: true}));
        }
    };

    render() {
        const {connect} = this.state;

        if(!connect){
            return(
                <div className="container voting__scatter-desc card">
                    <Translate content="voting.scatterDesc" className="text--lg" />
                    <Translate
                        content="buttons.auth"
                        component='button'
                        className="btn--gradient"
                        rel="noopener"
                        target="_blank"
                        onClick={this.auth}
                    />
                </div>
            )
        }

        return (
            <div className='container'>
                <VotingHeader/>

                <Tabs tabsTitles={['voteForProducer', 'setProxy']} tabsClass='tabs--voting' contentClass='tabs--voting_content'>
                    <ProducersTable/>
                    <ProxyTable/>
                </Tabs>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: reduxUser(state),
    scatter: reduxScatter(state)
});

export default connect(mapStateToProps)(VotingTools)
