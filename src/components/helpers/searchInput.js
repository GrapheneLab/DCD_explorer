import React, {Component} from 'react';
import Translate from "react-translate-component";
import {IconClose, IconSearch} from "../../svg";
import {Link} from "react-router-dom";
import {defaultBreakPoint} from "../data_temp";
import ReactDOM from "react-dom";
import {closeOverlay, openSidebar} from "../../dispatch/actionOverlay";
import {overlayData, pathName, screenData} from "../../reducers";
import {connect} from "react-redux";

class SearchInput extends Component {
    state ={
        active: false
    };

    handleOpen = () => {
        if(this.props.screen < 2) this.setState({active: true});
    };

    close = () => {
        this.props.close();
        this.setState({active: false});
    };

    handleOutsideClick = (e) => {
        const {screen} = this.props;
        const obj = ReactDOM.findDOMNode(this);
        if((e.target !== obj && e.target.closest('form.search') !== obj) && screen > 1){
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.close();
        }
    };

    handleChange = (e) => {
        document.addEventListener('click', this.handleOutsideClick, false);
        this.props.handleChange(e)
    };

    handleSubmit = (e) => {
        this.props.handleSubmit(e);
    };

    componentWillReceiveProps(props){
        if(this.props.active && !props.active){
            this.setState({active: props.active});
        }
    }

    render() {
        const { hints = '', value, screen } = this.props;
        const {active} = this.state;

        return (
            <form className={`search ${active ? 'mobile__active': ''}`}
                  onSubmit={this.handleSubmit}
            >
                {!(screen < 2 && active)
                    ? <IconSearch className='search__ico' onClick={this.handleOpen}/>
                    : <span className='btn--close' onClick={this.close}><IconClose/></span>
                }
                {(screen > 1 || active) &&
                    <Translate
                        component="input"
                        type="search"
                        className="search__field"
                        onChange={this.handleChange}
                        value={value}
                        aria-label="search"
                        attributes={{placeholder: `header.search`}}
                    />
                }
                {(screen < 2 && active && !hints) &&
                    <div className="hints__greeting">
                        <IconSearch/>
                        <p className="heading">Search</p>
                        <p className='text--lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut commodi deleniti dolor earum eius exercitationem nulla quibusdam reiciendis voluptatibus?</p>
                    </div>
                }

                <div className={`hints${(hints) ? ' hints--active' : ''}`}>
                    {hints}
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    screen: screenData(state)
});

export default connect(mapStateToProps)(SearchInput);
