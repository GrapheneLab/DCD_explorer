import React from 'react';
import {Link} from "react-router-dom";
import {LogoEOS} from "../../svg/index";
import {connect} from "react-redux";
import {screenData} from "../../reducers";

const Logo = ({screen}) => (
    <span className="logo__link text--md">
    <Link to='/' className="logo__img" rel='noopener' aria-label='logo-link'>
        <LogoEOS/>
    </Link>
        <span className='logo__title'>
            { screen > 0 && 'eosexplorer.app' }
            { screen > 1 &&
                < span className='lower text--sm'>by <a href="http://eos.blckchnd.com/" target="_blank" rel='noopener' className='link--ghost upper'>blckchnd</a> team</span>
            }
        </span>
    </span>
);

const mapStateToProps = state => ({
    screen: screenData(state)
});

export default connect(mapStateToProps)(Logo)
