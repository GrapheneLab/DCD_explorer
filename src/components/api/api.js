import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Animation from "../animation";
import Home from "./home";
import Authorization from "./authorization";
import Transactions from "./transactions";
import Glossary from "./glossary";
import Balance from "./balance";
import Vote from "./vote";
import Menu from "./menu";

class Api extends Component{

    render(){
        const basicLink = '/tools/api';

        return (
            <div className="api container">
                <h1 className="heading">API</h1>
                <div className="row">
                    <div className="col-md-3 api__menu-wrapper">
                        <Menu basicLink={basicLink} />
                    </div>
                    <div className="col-md-8 api__content-wrapper">
                        <Animation location={this.props.location} animation="fade-in-left">
                            <Switch location={this.props.location}>
                                <Route exact path={`${basicLink}`} component={Home} />
                                <Route exact path={`${basicLink}/auth/`} component={Authorization} />
                                <Route exact path={`${basicLink}/transactions/`} component={Transactions} />
                                <Route exact path={`${basicLink}/glossary/`} component={Glossary} />
                                <Route exact path={`${basicLink}/balance/`} component={Balance} />
                                <Route exact path={`${basicLink}/vote/`} component={Vote} />
                            </Switch>
                        </Animation>
                    </div>
                </div>
            </div>
        )
    }
}

export default Api
