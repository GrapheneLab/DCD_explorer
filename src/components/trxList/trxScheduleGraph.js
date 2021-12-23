import React, {Component, Fragment} from 'react'
import {defaultBreakPoint} from "../data_temp";
import Translate from "react-translate-component";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import TimeFilter from "../helpers/timeFilter";
import {IconTrx} from "../../svg";
import TrxGraph from "./trxGraph";
import TrxStatistic from "./trxStatistic";
import {getBackendData} from "../../actions/getData/getBackendData";
import {awaitForResult, setFixedNum} from "../../actions";

let defaultChartData = [
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
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
    { timestamp: 0, trxData: 0 },
];

const defaultStatsData = [
    { name: 'activity', number: 0 },
    { name: 'average', number: 0 },
    { name: 'record', number: 0 },
];

const gradientParams = {
    stroke: {
        from: '#EC6080',
        to: '#FADA79',
    },
    fill: {
        from: '#F39D7C',
        to: 'rgba(0, 0, 0, 0)',
    }
};

const formDate = (date) => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    return `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`
};

const formTime = (hour) => {
    hour = hour.length === 1 ? `0${hour}` : hour;
    return `${hour}:00`;
};

const formDayTimestamp = (date) => {
    let month = date.getMonth() + 1,
        day = date.getDate();
    return `${month < 10 ? '0'+month : month}.${day < 10 ? '0'+day : day}`;
};

const getStats = async () => getBackendData('gti', {dete_now: formDate(new Date())});
const getDataForDay = async (date) => getBackendData('dfeh', {dete_now: formDate(date)});
const getDataForDays = async (begin, end) => getBackendData('dfed', {begin: formDate(begin), end: formDate(end)});

class TrxScheduleGraph extends Component{
    state = {
        chartHeight: 250,
        chartWidth: 250,
        graphData: '',
        statsData: defaultStatsData,
        filter: 'day'
    };

    componentDidMount() {
        const activityNode = document.getElementsByClassName('activity')[0];
        const chartNode = document.getElementsByClassName('transactions__schedule')[0];
        const chartHeight = activityNode ? activityNode.offsetHeight - 40 : 250;
        const chartWidth = chartNode ? chartNode.offsetWidth - 60 : 250;

        this.setState({chartHeight, chartWidth});

        getStats().then(result => {
            const {statsData} = this.state;
            const {Activity, Average, Record} = result;

            statsData[0].number = Activity ? Activity : 0;
            statsData[1].number = Average ? setFixedNum(Average, 0) : 0;
            statsData[2].number = Record ? Record : 0;

            this.setState({statsData});
        });

        this.getData(1);
    }

    getData = (days) => days <= 1 ? this.getDayData() : this.getDaysData(days);

    getDayData = () => {
        getDataForDay(new Date()).then(e => {
            const hours = Object.keys(e.count);
            const trxList = Object.values(e.count);

            let graphData = trxList.map((trx, index) => ({
                timestamp: formTime(hours[index]),
                trxData: Number(trx)
            }));

            this.setState({graphData});
        }).catch(() => {
            this.setState({graphData: defaultChartData});
        });
    };

    getDaysData = (days) => {
        const today = new Date();
        const todayUnix = new Date().getTime();
        const end = new Date(today.getTime() - days * 86400 * 1000);

        getDataForDays(end, today).then(e => {
            const trxList = Object.values(e.count);

            const graphData = trxList.map((trx, index) => {
                const day = new Date(todayUnix - (trxList.length - 1 - index) * 86400 * 1000);
                return {
                    timestamp: formDayTimestamp(day),
                    trxData: Number(trx)
                };
            });

            this.setState({graphData});
        }).catch(() => {
            this.setState({graphData: defaultChartData});
        });
    };

    handleFilter = (filter) => {
        const daysCount = {
            day: 1,
            week: 7,
            month: 30,
            year: 365
        };

        this.setState({graphData: ''}, () => {
            awaitForResult(this.getData(daysCount[filter])).then(e => e);
        });
    };

    render(){

        const {chartWidth, chartHeight, graphData, statsData} = this.state;

        return (
            <Fragment>
                <TrxStatistic data={statsData} />
                {window.innerWidth > defaultBreakPoint.sm && chartHeight
                && <div className="col-md-8">
                    <div className="card transactions__card transactions__schedule">
                        <h2 className="transactions__header title">
                            <Translate content={`transactions.scheduleGraph.title`} />
                            <TimeFilter defaultValue="day" handleChange={this.handleFilter}/>
                        </h2>
                        {graphData &&
                            <TrxGraph
                                graphData={graphData}
                                chartWidth={chartWidth}
                                chartHeight={chartHeight}
                                gradientParams={gradientParams}
                                animationSpeed={1000}
                            />
                        }
                    </div>
                </div>
                }
            </Fragment>
        )
    }
}

export default TrxScheduleGraph;
