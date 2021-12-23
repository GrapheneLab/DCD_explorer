import React, {Component, Fragment} from "react";
import {IconCPU, IconNetwork, IconRam} from "../../svg/index";
import PriceItem from "./priceItem";
import BuyCalculator from "./buyCalculator";
import SellCalculator from "./sellCalculator";
import PageTitle from "../helpers/pageTitle";
import {awaitForResult} from "../../actions/awaitForResult";
import {getAdditionalPrices, getRamPrice} from "../../actions/formatted/formatPrice";
import Translate from "react-translate-component";
import {price} from "../../reducers";
import {connect} from "react-redux";
import {setFixedNum} from "../../actions";

const generateBytesPrices = (price) => ({
    bytes: price / 1024,
    KB: price,
    MB: price * 1024,
    GB: price * (1024 * 1024)
});

const generateBytesPerDayPrices = (price) => ({
    "bytes/day": price / 1024,
    "KB/day": price,
    "MB/day": price * 1024,
    "GB/day": price * (1024 * 1024)
});

const generateTimePrices = (price) => ({
    "mu/day": price / 1000,
    "ms/day": price,
    "s/day": price * 1000
});

const convertBasicPrices = (ramBasicPrice, networkBasicPrice, CPUBasicPrice) => ({
    eos: {
        ram: generateBytesPrices(ramBasicPrice['eos']),
        net: generateBytesPerDayPrices(networkBasicPrice['eos']),
        cpu: generateTimePrices(CPUBasicPrice['eos'])
    },
    usd: {
        ram: generateBytesPrices(ramBasicPrice['usd']),
        net: generateBytesPerDayPrices(networkBasicPrice['usd']),
        cpu: generateTimePrices(CPUBasicPrice['usd'])
    }
});

const formPriceItems = (ramBasicPrice, networkBasicPrice, CPUBasicPrice) => [
    {
        title: 'ram',
        icon: <IconRam />,
        eosPrice: ramBasicPrice['eos'],
        usdPrice: ramBasicPrice['usd'],
        per: <Translate content="calculator.perKiB" />
    },
    {
        title: 'network',
        icon: <IconNetwork />,
        eosPrice: networkBasicPrice['eos'],
        usdPrice: networkBasicPrice['usd'],
        per: <Translate content="measures.bytesPerDayList.KB/day" />
    },
    {
        title: 'cpu',
        icon: <IconCPU />,
        eosPrice: CPUBasicPrice['eos'],
        usdPrice: CPUBasicPrice['usd'],
        per: <Translate content="measures.daySecondsList.ms/day" />
    },
];

const formData = async (price) => {
    const ramEosPrice = await getRamPrice();
    const {networkEosPrice, cpuEosPrice} = await getAdditionalPrices();

    const ramBasicPrice = {
        eos: setFixedNum(ramEosPrice),
        usd: setFixedNum(ramEosPrice * price, 3)
    };

    const networkBasicPrice = {
        eos: setFixedNum(networkEosPrice),
        usd: setFixedNum(networkEosPrice * price, 3)
    };

    const CPUBasicPrice = {
        eos: setFixedNum(cpuEosPrice),
        usd: setFixedNum(cpuEosPrice * price, 3)
    };

    const basicPrices = convertBasicPrices(ramBasicPrice, networkBasicPrice, CPUBasicPrice);
    const priceItems = formPriceItems(ramBasicPrice, networkBasicPrice, CPUBasicPrice);

    return {basicPrices, priceItems};
};

class Calculator extends Component{
    state = {
        basicPrices: '',
        priceItems: '',
        isLoaded: false
    };

    componentDidMount(){
        const {price} = this.props;
        awaitForResult(
            formData(price)
        ).then(result => {
            const {basicPrices, priceItems} = result;
            this.setState({
                basicPrices,
                priceItems,
                isLoaded: true
            })
        });
    }


    render(){

        const {basicPrices, priceItems, isLoaded} = this.state;

        return (
            <div className="calculator container">
                <PageTitle pageName="calculator" />

                {isLoaded
                    ? <Fragment>
                        <div className="calculator__prices-wrapper row">
                            {priceItems.map( (data, index) => <PriceItem key={index} data={data} /> )}
                        </div>
                        <div className="calculator__forms-wrapper row">
                            <BuyCalculator basicPrices={basicPrices} />
                            <SellCalculator basicPrices={basicPrices} />
                        </div>
                      </Fragment>
                    : <div/>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    price: price(state)
});

export default connect(mapStateToProps)(Calculator)
