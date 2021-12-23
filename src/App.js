import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

import NotFound from "./components/notFound";
import Content from './components/layout/content';
import NotConnect from "./components/notConnect";
import {scatterConnect} from "./actions/scatter/scatterConnect";
import {wssInit} from "./actions/socket";
// import {scatterIdentity} from "./actions/scatter/scatterIdentity";

ScatterJS.plugins( new ScatterEOS() );

class App extends Component{

    componentDidMount(){
        window.ScatterJS = null;
        wssInit().catch(console.error);
        scatterConnect().then(e => {
            // if(e) scatterIdentity().then(account => {
            //     console.log(`auto auth: ${account}`);
            // })
        });
    }

    render(){
        return (
            <Fragment>
                <Switch location={this.props.location}>
                    <Route path="/404/" component={NotFound} />
                    <Route path="/connect/" component={NotConnect} />
                    <Route path="/" component={Content} />
                </Switch>
            </Fragment>
        )
    }
}

export default App;
