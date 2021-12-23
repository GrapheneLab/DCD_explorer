import React, {Component} from "react";
import InputField from "./inputField";
import ResultField from "./resultField";
import {bytesList, bytesPerDayList, daySecondsList, tokensList} from "../data_temp";
import Translate from "react-translate-component";

const sellDefaultStates = {
    topSelector: {
        ram: bytesList.list[0],
        net: bytesPerDayList.list[0],
        cpu: daySecondsList.list[0],
    },
    bottomSelector: {
        ram: tokensList.list[0],
        net: tokensList.list[0],
        cpu: tokensList.list[0]
    },
    fieldValues: {
        ram: '',
        net: '',
        cpu: ''
    },
};

class SellCalculator extends Component{

    state = sellDefaultStates;

    getVal = (type, val, idName) => {
        const {topSelector, bottomSelector, fieldValues} = this.state;

        let selectedState = {};

        switch(type){
            case 'field':
                selectedState = fieldValues;
                break;
            case 'topSelector':
                selectedState = topSelector;
                break;
            case 'bottomSelector':
                selectedState = bottomSelector;
                break;
        }

        selectedState[idName] = val;

        this.setState({topSelector, bottomSelector, fieldValues});
    };

    render(){

        const {topSelector, bottomSelector, fieldValues} = this.state;
        const basicPrices = this.props.basicPrices;

        return (
            <div className="col-lg-6">
                <div className="calc-item">
                    <div className="calc-item__top">
                        <Translate content="calculator.needToBuy" component="h3" className="heading"/>
                        <div className="calc-item__inputs-wrapper">
                            <InputField
                                id="ram"
                                commentType="of"
                                selected={topSelector}
                                optionsList={bytesList}
                                fieldValue={fieldValues}
                                getVal={this.getVal}
                            />
                            <InputField
                                id="net"
                                commentType="of"
                                selected={topSelector}
                                optionsList={bytesPerDayList}
                                fieldValue={fieldValues}
                                getVal={this.getVal}
                            />
                            <InputField
                                id="cpu"
                                commentType="of"
                                selected={topSelector}
                                optionsList={daySecondsList}
                                fieldValue={fieldValues}
                                getVal={this.getVal}
                            />
                        </div>
                    </div>
                    <div className="calc-item__bottom">
                        <Translate content="calculator.willCost" component="h3" className="heading"/>
                        <div className="calc-item__inputs-wrapper">
                            <ResultField
                                id="ram"
                                type="multiply"
                                commentType="for"
                                optionsList={tokensList}
                                fieldValues={fieldValues}
                                bottomSelector={bottomSelector}
                                topSelector={topSelector}
                                basicPrices={basicPrices}
                                getVal={this.getVal}
                            />
                            <ResultField
                                id="net"
                                type="multiply"
                                commentType="for"
                                optionsList={tokensList}
                                fieldValues={fieldValues}
                                bottomSelector={bottomSelector}
                                topSelector={topSelector}
                                basicPrices={basicPrices}
                                getVal={this.getVal}
                            />
                            <ResultField
                                id="cpu"
                                type="multiply"
                                commentType="for"
                                optionsList={tokensList}
                                fieldValues={fieldValues}
                                bottomSelector={bottomSelector}
                                topSelector={topSelector}
                                basicPrices={basicPrices}
                                getVal={this.getVal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SellCalculator
