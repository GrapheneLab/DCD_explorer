import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {IconBP, IconDashboard, IconProject, IconTrx, IconProxy} from "../../svg/";

import {overlayData, pathName} from "../../reducers/index";
import {connect} from "react-redux";
import {closeOverlay, openSidebar} from "../../dispatch/actionOverlay";
import {IconAccounts, Active} from "../icons/index";
import {socialLink} from "../data_temp";
import Translate from "react-translate-component";
import {Socials} from "../helpers/socials";
import {screenData} from "../../reducers";

const tools = [
    {content: 'broadcast.title', url: '/tools/broadcast'},
    {content: 'calculator.title', url: '/tools/calculator'},
    {content: 'bids.title', url: '/tools/bids'},
    {content: 'voting.title', url: '/tools/voting'}
];

const menuItems = [
    {content: 'dashboard', url: '', icon: <IconDashboard/>},
    {content: 'accounts', url: 'accounts', icon: <IconAccounts defs={Active}/>},
    // {content: 'transactions', url: 'trx', icon: <IconTrx/>},
    {content: 'producers', url: 'bp', icon: <IconBP/>},
    // {content: 'proxies', url: 'proxies', icon: <IconProxy/>, customStyle: 'proxy-icon'},
];

class Sidebar extends Component {
    render() {
        const {overlay, closeOverlay, openSidebar, screen} = this.props;

        const closeMenu = screen < 2 ? closeOverlay : undefined;

        return (
            <aside className="menu">
                {screen > 1 &&
                <button className="burger" aria-label="menu" onClick={overlay ? closeOverlay : openSidebar}>
                    <span/><span/><span/><span/>
                </button>
                }
                <div className="menu__inner">
                    {screen < 2 &&
                    <span className="menu__item brand">
                        eosexplorer.app
                        <span className='lower text--sm'>
                            by <a href="http://eos.blckchnd.com/" className='link--ghost upper' rel='noopener'>blckchnd</a> team
                        </span>
                    </span>
                    }

                    {menuItems.map(el =>
                        <NavLink className={`menu__item ${el.customStyle ? el.customStyle : ''}`} key={el.content} to={`/${el.url}`} exact onClick={closeMenu}>
                            <span className="menu__ico">{el.icon}</span>
                            <Translate content={`${el.content}.title`} className="text--md menu__text"/>
                        </NavLink>
                    )}

                    {screen < 2 &&
                    <Fragment>
                        <span className="menu__item divider"><span className='title text--md'>Tools</span></span>
                        {tools.map(e =>
                            <NavLink className='menu__item' key={e.content} to={e.url} onClick={closeMenu}>
                                <IconProject className='project-ico--blue'/>
                                <Translate content={e.content} className="text--md"/>
                            </NavLink>
                        )}
                        <div className="social">
                            <Socials data={socialLink}/>
                        </div>
                    </Fragment>
                    }
                </div>
            </aside>
        )
    }
}


const mapStateToProps = state => ({
    // auth: isAuthorized(state)
    screen: screenData(state),
    overlay: overlayData(state),
    pathName: pathName(state)
});

const mapDispatchToProps = dispatch => ({
    closeOverlay: data => dispatch(closeOverlay(data)),
    openSidebar: data => dispatch(openSidebar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
