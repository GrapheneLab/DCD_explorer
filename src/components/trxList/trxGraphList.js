import React, {Component, Fragment} from 'react'
import TrxLiveGraph from "./trxLiveGraph";
import TrxScheduleGraph from "./trxScheduleGraph";
import Translate from "react-translate-component";

class TrxGraphList extends Component{
    state = {
        showLiveGraph: true
    };

    changeGraph = () => this.setState({showLiveGraph: !this.state.showLiveGraph});

    prevent = (e) => e.preventDefault();

    render = () => {
        const showLiveGraph = this.state.showLiveGraph;

        return (
            <Fragment>
                <div className="col-md-12 accounts__header">
                    <Translate component='h2' content="transactions.title" className="heading"/>
                    {/*<div className="graph-switch">*/}
                        {/*<Translate*/}
                            {/*content="transactions.liveGraph.btn"*/}
                            {/*container="div"*/}
                            {/*className={`graph-switch__btn${showLiveGraph ? ' graph-switch__btn--active' : ''}`}*/}
                            {/*onClick={!showLiveGraph ? this.changeGraph : this.prevent}*/}
                        {/*/>*/}
                        {/*<Translate*/}
                            {/*content="transactions.scheduleGraph.btn"*/}
                            {/*container="div"*/}
                            {/*className={`graph-switch__btn${!showLiveGraph ? ' graph-switch__btn--active' : ''}`}*/}
                            {/*onClick={showLiveGraph ? this.changeGraph : this.prevent}*/}
                        {/*/>*/}
                    {/*</div>*/}
                </div>
                {/*{*/}
                    {/*showLiveGraph*/}
                        {/*?*/} <TrxLiveGraph />
                        {/*: <TrxScheduleGraph />*/}
                {/*}*/}
            </Fragment>
        );
    }
}

export default TrxGraphList;
