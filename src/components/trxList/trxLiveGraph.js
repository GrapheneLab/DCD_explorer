import React, {Component, Fragment} from 'react'
import {defaultBreakPoint} from "../data_temp";
import {chainOperation, dateToLocal, getBackendData, setFixedNum} from "../../actions";
import TrxStatistic from "./trxStatistic";
import TrxGraph from "./trxGraph";
import Translate from "react-translate-component";

const defaultGraphData = [
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 }
];

const defaultStatsData = [
    { name: 'current', number: 0 },
    { name: 'averageLive', number: 0 },
    // { name: 'max', number: 3996 },
];

const gradientParams = {
    stroke: {
        from: '#6076EC',
        to: '#79FAFA',
    },
    fill: {
        from: '#5AB2FA',
        to: 'rgba(0, 0, 0, 0)',
    }
};

const getLastBlock = async (lastBlock = '') => {

    let newBlock = await chainOperation('get_info').then(e => e.head_block_num).catch(() => lastBlock);

    let missedBlocks = [],
        trxSumm = 0,
        lastMissedBlock = newBlock - 4;

    if(lastBlock && lastBlock >= lastMissedBlock) {
        lastMissedBlock = lastBlock + 1
    }

    for(let i = lastMissedBlock; i <= newBlock; i++){
        missedBlocks.push(i);
    }

    if(!missedBlocks.length) return false;

    return await chainOperation('get_blocks', {blocks: missedBlocks})
        .then(result => {
            const timestamp = result[result.length - 2].timestamp;
            const lastSecond = new Date(timestamp).getSeconds();

            result
                .filter(el => new Date(el.timestamp).getSeconds() === lastSecond)
                .forEach(el => {
                    trxSumm += el.transactions.length;
                });

            return ({
                block: newBlock,
                timestamp: dateToLocal(timestamp, {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'}),
                trxData: trxSumm
            });
        });
};

// const getMaxTPS = () => getBackendData('gmt').then(tpsData => tpsData.tps);

class TrxLiveGraph extends Component{
    state = {
        chartHeight: 250,
        chartWidth: 250,
        graphData: defaultGraphData,
        statsData: defaultStatsData,
        timer: ''
    };

    componentDidMount() {

        // getMaxTPS().then(result => {
        //     const statsData = [...this.state.statsData];
        //     statsData[2].number = result;
        //     this.setState({statsData})
        // });

        const activityNode = document.getElementsByClassName('activity')[0];
        const chartNode = document.getElementsByClassName('transactions__schedule')[0];
        const chartHeight = activityNode ? activityNode.offsetHeight - 40 : 250;
        const chartWidth = chartNode ? chartNode.offsetWidth - 60 : 250;

        this.setState({chartHeight, chartWidth});

        this.getGraph();
    }

    componentWillUnmount(){
        const {timer} = this.state;
        timer ? clearTimeout(timer) : '';
    }

    getGraph = (lastBlock = '') => {
        let {graphData, statsData} = this.state;

        getLastBlock(lastBlock).then(result => {

            if(!result){
                const timer = setTimeout(() => this.getGraph(lastBlock), 2000);
                this.setState({timer});
                return;
            }

            if(graphData.length >= 14){
                graphData = graphData.slice(1,)
            }

            graphData.push(result);

            let trxNumber = 0;

            const allTrxSumm = graphData.reduce((acc, next) => {
                next.trxData ? trxNumber += 1 : '';
                return acc + next.trxData;
            }, 0);

            statsData[0].number = result.trxData;
            statsData[1].number = setFixedNum(allTrxSumm / trxNumber, 0);

            const timer = setTimeout(() => this.getGraph(result.block), 2000);

            this.setState({graphData, statsData, timer});
        })

    };

    render(){

        const {chartHeight, chartWidth, graphData, statsData} = this.state;

        return (
            <Fragment>
                <TrxStatistic data={statsData} />
                {window.innerWidth > defaultBreakPoint.sm && chartHeight
                    && <div className="col-md-8">
                            <div className="card transactions__card transactions__schedule">
                                <h2 className="transactions__header title">
                                    <Translate content={`transactions.liveGraph.title`} />
                                </h2>
                                <TrxGraph
                                    graphData={graphData}
                                    chartWidth={chartWidth}
                                    chartHeight={chartHeight}
                                    gradientParams={gradientParams}
                                />
                            </div>
                    </div>
                }
            </Fragment>
        )
    }
}

export default TrxLiveGraph;
