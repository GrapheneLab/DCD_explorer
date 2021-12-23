import React from 'react';
import PageTitle from "../helpers/pageTitle";
import ChainId from "../helpers/chainId";
import DashboardGraph from "./dashboardGraph";
import DashboardDiagram from "./dashboardDiagram";
import DashboardHeadBlock from "./dashboardHeadBlock";
import DashboardTotals from "./dashboardTotals";

export const Dashboard = () => (
    <section className="container dashboard">
        <div className="col-md-12 dashboard__header">
            <PageTitle pageName="dashboard" />
            <ChainId />
        </div>
        <DashboardTotals />
        <DashboardHeadBlock />
        <DashboardDiagram />
        <DashboardGraph />
    </section>
);
