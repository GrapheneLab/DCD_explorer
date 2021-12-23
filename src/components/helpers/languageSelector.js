import React, {Component} from 'react';
import counterpart from "counterpart";
import Dropdown from "./dropdown";
import {getCookie, setCookie} from "../../actions/index";
import {checkCrowdin} from "../data_temp";

class LanguageSelector extends Component{
    state = {
        selectedLang: localStorage.getItem('language') || 'EN',
        language: ['EN', 'RU']
    };

    setLocale = (event) => {
        const selectedLang = event.target.dataset.type;
        counterpart.setLocale(selectedLang);
        localStorage.setItem('language', selectedLang);
        this.setState({selectedLang});
    };

    componentDidMount(){
        if(checkCrowdin){
            this.setState({selectedLang: 'ACH', language: ['ACH']});
        }
    }

    render(){
        const {selectedLang, language} = this.state;
        return (
            <Dropdown
                className='text--sm dropdown--bg header__networkList'
                title={<span className='title'>{selectedLang}</span>}
                list={
                    language.map((elem, index) => <button key={index} data-type={elem} onClick={this.setLocale}>{elem}</button>)
                }
            />
        )
    }
}

export default LanguageSelector
