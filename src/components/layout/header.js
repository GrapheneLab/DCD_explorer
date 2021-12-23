import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import {connect} from "react-redux";

import {overlayData, pathName, screenData} from "../../reducers";
import {closeOverlay, openSidebar} from "../../dispatch";

import Dropdown from "../helpers/dropdown";
import Logo from "../helpers/logo";
import LanguageSelector from "../helpers/languageSelector";
import SearchWithDebounce from "../helpers/searchWithDebounce";
import AuthScatter from '../helpers/authScatter';

const tools = [ 'broadcast', 'calculator', 'bids', 'voting'];
const blockChains = [ 'eos', 'telos', 'deos', 'pesos', 'uroboros'];

class Header extends Component{
    render(){
        const {overlay, closeOverlay, openSidebar, history, pathName, screen} = this.props;

        return (
            <nav className='header'>
                {screen !== 2 &&
                    <button className="burger" aria-label='menu' onClick={overlay ? closeOverlay : openSidebar}>
                        <span/><span/><span/><span/>
                    </button>
                }
                <div className="header__blckchnd"><Logo /></div>
                <SearchWithDebounce pageName="header" className='' history={history} path={pathName}/>

                {screen === 2  &&
                    <div className="header__right-menu">
                        <AuthScatter />
                        <Dropdown className='text--sm dropdown--bg dropdown--md'
                                  title={<Translate content="tools.title" className="title" />}
                                  list={tools.map(el => <Translate content={`${el}.title`} component={Link} to={`/tools/${el}`} />)}
                        />
                        <Dropdown className='text--sm dropdown--bg dropdown--md'
                                  title={<span className="title">{blockChains[0]}</span>}
                                  list={blockChains}
                        />
                        <LanguageSelector />
                    </div>
                }

            </nav>
        )
    }
}

const mapStateToProps = state => ({
    screen: screenData(state),
    overlay: overlayData(state),
    pathName: pathName(state)
});

const mapDispatchToProps = dispatch => ({
    closeOverlay: data => dispatch(closeOverlay(data)),
    openSidebar: data => dispatch(openSidebar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
