import React, {Component} from "react";
import Translate from "react-translate-component";
import {connect} from "react-redux";

import AreaChart from "recharts/es6/chart/AreaChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Area from "recharts/es6/cartesian/Area";
import Tooltip from "recharts/es6/component/Tooltip";

import CustomAxis from "./customAxis";
import TimeFilter from "../helpers/timeFilter";
import CustomTooltip from "./CustomTooltip";
import {awaitForResult} from "../../actions/awaitForResult";
import {price, screenData} from "../../reducers";
import {changeRate} from "../../dispatch";
import {getCapData, setFixedNum} from "../../actions";

import {PreLoader} from "../helpers/preloader";

const updateInterval = 300000;

class DashboardGraph extends Component {
    state = {
        chartWidth: 400,
        viewChart: false,
        area: true,
        showPreloader: true,
        days: 365
    };

    componentDidMount() {
        const {days} = this.state;
        return awaitForResult(getCapData(days)).then(e => {
            const rate = +(e[e.length -1 ].price.toPrecision(3));
            const reData = setInterval(() => {
                getCapData(days).then(viewChart => {
                    this.props.changeRate(+viewChart[viewChart.length -1 ].price.toPrecision(3));
                    this.setState({ viewChart })
                })
            }, updateInterval);

            const [yesterday, today] = e.slice(e.length - 2);

            const dailyCap = {
                price: {
                    summ: setFixedNum(today.price, 2),
                    change: setFixedNum((today.price / yesterday.price - 1) * 100, 2)
                },
                cap: {
                    summ: setFixedNum(today.caps, 2),
                    change: setFixedNum((today.caps / yesterday.caps - 1) * 100, 2)
                }
            };

            this.props.changeRate(rate);
            this.setState({viewChart: e, dailyCap, reData});
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.reData)
    }

    changePeriod = (value) => {
        clearInterval(this.state.reData);
        this.setState({area: false, reData: false, showPreloader: true}, () => {
            const daysCount = {
                day: 1,
                week: 7,
                month: 30,
                year: 365,
                all: (new Date().getTime() - Date.UTC(2017, 6, 1, 0, 0, 0))/(60*60*24*1000)
            };

            let reData = setInterval(() => {
                getCapData(daysCount[value]).then(viewChart => this.setState({viewChart}))
            }, updateInterval);

            return getCapData(daysCount[value])
                .then(e => this.setState({
                    days: daysCount[value],
                    viewChart: e,
                    area: true,
                    showPreloader: false,
                    reData
                }));
        });
    };

    render() {
        const {viewChart, dailyCap, area, showPreloader} = this.state;

        if (!viewChart) return '';

        let {chartWidth, screen} = this.props;
        const showGraph = screen > 0;

        const grdStroke = [
            {begin: '#6076EC', end: '#79FAFA', x: '0.8', y: '0'},
            {begin: '#EC6080', end: '#FADA79', x: '0', y: '1'}
        ];
        const grdFill = [ '#5AB2FA', '#F39D7C' ];

        const priceTitles = [
            {title: 'price', key: 'price'},
            {title: 'marketcap', key: 'cap', addClass: 'cmc'},
        ];

        chartWidth = this.refs.chart ? this.refs.chart.offsetWidth - (screen > 1 ? 100 : 60) : chartWidth;

        return (
            <div className="col-md-12 price__block">
                <div ref='chart' className="card">
                    <div className="price__header">
                        {priceTitles.map(el =>
                            <p key={el.title} className={`title price__title ${el.addClass ? el.addClass : ''}`}>
                                <Translate content={`dashboard.${el.title}`} className="price__name"/>
                                    <span className={`text--${dailyCap[el.key].change > 0 ? 'success' : 'danger'}`}>
                                    {dailyCap[el.key].summ} ( {dailyCap[el.key].change}% )
                                </span>
                            </p>
                        )}
                        <TimeFilter handleChange={this.changePeriod} period={['day', 'week', 'month', 'year', 'all']}/>
                    </div>
                    {!showGraph
                        ? ''
                        : showPreloader
                            ? <PreLoader />
                            : <AreaChart width={chartWidth} height={450} data={viewChart}>
                                <defs>
                                    {grdStroke.map((el,index) =>
                                        <linearGradient key={`chart${index}_stroke`} id={`chart${index}_stroke`} x1="0" y1="0" x2={el.x} y2={el.y}>
                                            <stop offset="5%" stopColor={el.begin} stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor={el.end} stopOpacity={0.6}/>
                                        </linearGradient>
                                    )}
                                    {grdFill.map((color, index) =>
                                        <linearGradient key={`chart${index}_fill`} id={`chart${index}_fill`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={color} stopOpacity={0.3}/>
                                            <stop offset="80%" stopColor="transparent" stopOpacity={0}/>
                                        </linearGradient>
                                    )}
                                </defs>
                                <XAxis dataKey="timestamp" interval='preserveEnd' tick={<CustomAxis/>} padding={{right: 20, left: 20}}/>
                                {screen > 1 &&
                                    <YAxis key='left' type="number" dataKey="price" orientation="left" stroke="#82ca9d"/>
                                }
                                <CartesianGrid vertical={false}/>
                                <Tooltip content={<CustomTooltip />} className='tooltip'/>
                                {area &&
                                    ['price', 'caps'].map((area,index) =>
                                        <Area key={`area-${index}`}
                                              type="monotone"
                                              dataKey={area}
                                              stroke={`url(#chart${index}_stroke)`}
                                              strokeWidth={2}
                                              fillOpacity={1}
                                              fill={`url(#chart${index}_fill)`}
                                        />
                                    )
                                }
                            </AreaChart>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    screen: screenData(state),
    price: price(state)
});

const mapDispatchToProps = dispatch => ({
    changeRate: data => dispatch(changeRate(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGraph)
