import React, {Component} from 'react';
import Dropdown from "../helpers/dropdown";
import Translate from "react-translate-component";

const defaultPeriod = ['day', 'week', 'month', 'year'];

class TimeFilter extends Component{
    state = {
        chartOption: this.props.defaultValue || 'year'
    };

    componentDidMount(){
        let defaultValue = this.props.defaultValue || 'year';
        this.setData(defaultValue);
    }

    handleClick = (event) => this.setData(event.target.dataset.type);

    setData = (chartOption) => {
        const {handleChange} = this.props;

        this.setState({chartOption});
        if(handleChange) handleChange(chartOption);
    };

    render(){
        const {period = defaultPeriod} = this.props;

        return (
            <Dropdown
                className='text--sm dropdown--bg'
                title={
                    <Translate content={`timeFilter.${this.state.chartOption}`} className='title' />
                }
                list={period.map(el => <Translate content={`timeFilter.${el}`} component="button" data-type={el} onClick={this.handleClick} />)}
            />
        )
    }
}

export default TimeFilter
