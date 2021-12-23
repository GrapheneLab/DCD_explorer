import React, { Component } from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {loaderData, nodeInfo, overlayData, screenData, alertData} from "../../reducers/";
import {closeOverlay, setNode, changeRate, updateResolution, getCoreToken} from "../../dispatch/";
import {nodesConnect, awaitForResult, getCapData} from "../../actions";

import Animation from "../animation";
import Api from "../api/api";
import Loader from "../loader";

import {Dashboard} from "../dashboard/dashboard";
import UserPage from "../userPage/userPage";
import Producers from "../producers";
import Sidebar from "./sidebar";
import Header from "./header";
import Accounts from "../accounts";
import Broadcast from "../broadcast";
import Bids from "../bids";
import Calculator from "../calculator/calculator";
import Transactions from "../trxList/transactions";
import {Footer} from "./footer";
import TrxPage from "../trxPage/trxPage";
import BlockPage from "../blockPage/";
import CookieWarning from "./cookieWarning";
import {defaultBreakPoint} from "../data_temp";
import Alert from "../helpers/alert";
import Proxies from "../proxies";
import VotingTools from "../voting/votingPage";
import NotFound from "../notFound";
import ContractTable from "../contract/contractTable";
import ContractPage from "../contract/contractPage";

class Content extends Component{
    state = {
        redirect: false
    };

    resize = () => {
        const resolution = window.innerWidth;
        const screen = this.props.screen;

        if(resolution < defaultBreakPoint.sm) {
            screen !== 0 ? this.props.updateResolution(0) : '';
            return
        }

        if(resolution < defaultBreakPoint.md) {
            screen !== 1 ? this.props.updateResolution(1) : '';
            return
        }

        screen !== 2 ? this.props.updateResolution(2) : '';
    };

    componentDidMount(){
        this.resize();
        window.addEventListener('resize', this.resize, false);

        getCapData(1).then(e => {this.props.changeRate(+e[e.length -1 ].price.toPrecision(3))});

        awaitForResult(
            this.connectNodes()
        ).then(() => {
            if(this.props.node){
                this.props.getCoreToken();
            }
        });
    };

    componentWillReceiveProps(props){
        if(props.node && props.node !== this.props.node){
            this.props.getCoreToken();
        }
    }

    connectNodes = () => {
        const {setNode} = this.props;
        const timeout = setTimeout(() => this.setState({redirect: true}), 15000);

        nodesConnect()
            .then(link => {
                setNode(link);
                clearTimeout(timeout);
            }).catch(() => {
                this.connectNodes();
            });
    };

    render(){
        const {redirect} = this.state;
        const {node, showLoader, overlay, closeOverlay, history, location} = this.props;

        if(redirect){
            return <Redirect to='/connect/' />
        }

        return (
            <div id="app" className={overlay || ''}>
                <Sidebar key='sidebar'/>
                <main key='content'>
                    <Header history={history} />
                    {node
                        ? <Animation location={location} excludePath={['/tools/api']} animation="fade-in-left">
                            <Switch location={location}>
                                <Route exact path="/" component={Dashboard} />
                                <Route exact path="/accounts" component={Accounts} />
                                <Route path="/accounts/:name" component={UserPage} />
                                <Route exact path="/contract/:name" component={ContractPage} />
                                <Route exact path="/contract/:name/:table" component={ContractTable} />
                                <Route exact path="/bp" component={Producers} />
                                <Route exact path="/proxies" component={Proxies} />
                                <Route exact path="/trx" component={Transactions} />
                                <Route exact path="/trx/:id" component={TrxPage} />
                                <Route exact path="/block/:id" component={BlockPage} />
                                <Route path="/tools/broadcast" component={Broadcast} />
                                <Route exact path="/tools/calculator" component={Calculator} />
                                <Route exact path="/tools/bids" component={Bids} />
                                <Route exact path="/tools/voting" component={VotingTools} />
                                <Route path="/tools/api" component={Api} />
                                <Route render={ () => <Redirect push to='/404/' /> } />
                            </Switch>
                        </Animation>
                        : ''
                    }
                    <Footer />
                </main>
                <span className="overlay" onClick={() => closeOverlay()}/>
                <Loader show={showLoader} />
                <CookieWarning />
                <Alert data={this.props.alert} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    overlay: overlayData(state),
    showLoader: loaderData(state),
    node: nodeInfo(state),
    screen: screenData(state),
    alert: alertData(state)
});

const mapDispatchToProps = dispatch => ({
    setNode: data => dispatch(setNode(data)),
    updateResolution: data => dispatch(updateResolution(data)),
    closeOverlay: () => dispatch(closeOverlay()),
    getCoreToken: () => dispatch(getCoreToken()),
    changeRate: data => dispatch(changeRate(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content)
