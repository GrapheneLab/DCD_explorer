import React, {Component} from "react";
import {connect} from "react-redux";
import {store} from '../../index';
import CheckBox from "./checkBox";
import {reduxVoting} from "../../reducers";

class TableCheckBox extends Component {
    state = {
        check: false
    };

    componentDidMount(){
        const {index, type} = this.props;
        const {proxy, producers} =  store.getState().voting;

        this.setState({ check: type === 'producers' ? producers.includes(index) : proxy === index })
    }

    componentWillReceiveProps(props){
        const {index} = this.props;
        const {proxy, producers} = props.voting;

        return this.setState({check: props.type === 'producers' ? producers.includes(index) : proxy === index});
    }

    shouldComponentUpdate(props, state){
        return  this.state.check !== state.check
    }

    render(){
        const {index, fn, voting, type} = this.props;
        const {producers, proxy} = voting;

        let value = type === 'producers' ? producers.includes(index) : proxy === index ;
        let disabled = type === 'producers' && producers.length >= 29 && !producers.includes(index);

        return <CheckBox key={`check-${index}`} id={`check-${index}`} value={value} onChange={() => fn(index)} disabled={disabled}/>
    }
}

const mapStateToProps = state => ({
    voting: reduxVoting(state),
});

export default connect(mapStateToProps)(TableCheckBox)
