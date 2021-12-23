import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import { setMeasure, awaitForResult, setDefaultNumber, setFixedNum } from "../../actions";
import {bytesList} from "../data_temp";
import {coreToken, price} from "../../reducers";
import {DashboardPie} from "./dashboardPie";
import {getRam} from "../../actions/getData/getRam";
import Loader from "../loader";
import {PreLoader} from "../helpers/preloader";

const defaultRam = () => {
    let storageValues = localStorage.getItem('ram');
    let ram = {
        collected: '',
        fee: '',
        free: '',
        price: 0,
        reserved: '',
        max: ''
    };

    if(storageValues) ram = JSON.parse(storageValues);

    return {
        supply: {
            max_supply: "10000000000.0000 EOS",
            supply: "10000000000.0000 EOS"
        },
        stacked: 0,
        ram
    }
};


class DashboardDiagram extends Component {
    state = defaultRam();

    componentDidMount() {
        let token = this.props.token || 'EOS';
        getRam(token)
            .catch(e => console.log(e))
            .then(e => {
                const interval = setInterval(() => {
                    getRam(token).then(e => { this.setState(e) })
                }, 1000);

                this.setState({...e, interval});
            })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const {supply, stacked, ram} = this.state;
        const {price: priceUsd} = this.props;

        if(!stacked) return (
            <div className="col-md-12 dashboard__diagram">
                <PreLoader/>
            </div>
        );

        const {max, free, price, fee, collected} = ram;

        let token = this.props.token || '';

        const toNum = (str) => str.length ? Number(str.split(' ')[0]) : 0;

        let numRamMax = toNum(max),
            numRamFree = toNum(free),
            numSupply = Number(supply.supply.split(' ')[0]),
            numStacked = Number(stacked);

        const supplyChart = [
            {name: 'Supply', value: numSupply - numStacked},
            {name: 'Staked', value: numStacked},
        ];

        const supplyDesc = [
            {content: 'supply', value: numSupply},
            {content: 'stacked', value: numStacked},
        ];

        const ramChart = [
            {name: 'Group A', value: numRamFree},
            {name: 'Group B', value: numRamMax - numRamFree}
        ];

        const measure = {titles: bytesList, divider: 1024};

        const ramDesc = [
            {content: 'supplyRam', value: setMeasure(numRamMax, measure)},
            {content: 'reserved', value: setMeasure(numRamMax - numRamFree, measure)},
            // {content: 'used', value: setMeasure(ram.usedRam, measure)},
            {content: 'free', value: setMeasure(numRamFree, measure)},
            {content: 'fee', value: fee},
            {content: 'collected', value: collected},
        ];

        const diagram = [
            {
                content: supplyChart,
                label:
                    <span className="diagram__label text--lg">
                        {setDefaultNumber(numStacked, 0)}<br/> ({numSupply ? (numStacked / numSupply * 100).toFixed(1) : 0}%)
                    </span>,
                desc: supplyDesc.map(el =>
                            <p className="text--lg diagram__text" key={el.content}>
                                <Translate content={`dashboard.${el.content}`} className='title'/>
                                {setDefaultNumber(el.value)} {token}
                            </p>
                        )
            },
            {
                classNames: 'diagram__item--ram',
                content: ramChart,
                label:
                    <span className="diagram__label text--lg">
                        {((numRamMax - numRamFree) / (1024 * 1024 * 1024)).toFixed(2)} Gb<br/>
                        ({numRamMax ? ((numRamMax - numRamFree) / numRamMax * 100).toFixed(1) : 0} %)
                    </span>,
                desc: ramDesc.map(el =>
                            <p className="text--md diagram__text" key={el.content}>
                                <span>{el.value}</span>
                                <Translate content={`dashboard.${el.content}`} ram='RAM' className='title'/>
                            </p>
                        )
            },
        ];

        return (
            <Fragment>
                <div className="col-md-12 dashboard__diagram">
                    {diagram.map((el,index) => <DashboardPie key={index} data={el} />)}
                </div>
                <div className="col-md-12">
                    <div className="card ram-price text--lg">
                        <Translate content='dashboard.ramPrice' ram='RAM' className='title'/>
                        <span>{setFixedNum(price)} {token.toUpperCase()}/KB</span>
                        <span>{setFixedNum(price * priceUsd)} $/KB</span>
                        <Translate content="dashboard.calculatorLink" component={Link} to='tools/calculator' className="btn--gradient" />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    token: coreToken(state),
    price: price(state)
});

export default connect(mapStateToProps)(DashboardDiagram)
