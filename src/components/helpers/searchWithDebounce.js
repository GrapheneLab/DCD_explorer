import React, {Component} from 'react';
import SearchInput from "./searchInput";
import {fullSearch, hintsDOM, tryRequest} from "../../actions";

const emptyHints = {dom: '', hints: '', value: ''};
const timeInterval = 200;

class SearchWithDebounce extends Component{
    state = {
        timeout: '',
        dom: '',
        hints: '',
        value: ''
    };

    close = () => {
        clearTimeout(this.state.timeout);
        this.setState(emptyHints);
    };

    handleChange = (e) => {
        if(this.state.timeout) clearTimeout(this.state.timeout);

        const value = e.target.value.trim();

        const reg = new RegExp(/[A-Za-z0-9.]/g);

        if(reg.test(value[value.length - 1])){
            let timeout = setTimeout(
                () => fullSearch(value).then((e) => this.setState(e)),
                timeInterval
            );
            this.setState({value, timeout});
        }
    };

    goTo = (value, result) => {
        if(!value) return;

        const {block, trx, usersData, keys} = result;
        const history = this.props.history;

        if(usersData && usersData[0] === value && !trx.length && !block.length && !keys.length){
            return history.push(`/accounts/${usersData[0]}`);
        }

        if(`${block[0]}` === value && (!usersData || !usersData.includes(value))){
            return history.push(`/block/${block[0]}`);
        }

        if(keys.length === 1){
            return history.push(`/accounts/${keys[0]}`);
        }

        if(trx[0] === value){
            return history.push(`/trx/${trx[0]}`);
        }

        return this.setState({dom: hintsDOM(result)});
    };

    componentWillReceiveProps(props){
        if(this.props.path !== props.path){
            this.setState(emptyHints);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(this.state.timeout);

        const value = e.target.childNodes[1].value;

        return tryRequest(value).then(e => this.goTo(value, e));
    };

    render() {
        return(
            <SearchInput
                hints={this.state.dom}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                close={this.close}
                value={this.state.value}
                active={this.state.hints !== '' && this.state.dom !== ''}
            />
        );
    }
}

export default SearchWithDebounce;
