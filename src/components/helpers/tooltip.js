import React, {Component} from 'react';
import Translate from "react-translate-component";
import {connect} from "react-redux";
import {screenData} from "../../reducers";

class Tooltip extends Component {
    state = {
        focus: false
    };

    handleFocus = () => {
        this.setState({focus: !this.state.focus})
    };

    open = () => {
        this.setState({focus: true})
    };

    close = () => {
      this.setState({focus: false})
    };

    render(){
        const {children, text, screen} = this.props;
        return (
            <button className="tooltip"
                    onBlur={screen < 2 ? this.close : undefined}
                    onClick={screen < 2 ? this.handleFocus : undefined}
                    onMouseEnter={screen > 1 ? this.open : undefined}
                    onMouseLeave={screen > 1 ? this.close : undefined}
            >
                <div className={`tooltip__element ${this.state.focus ? 'focus' : ''}`}>{children}</div>
                <Translate component="span" content={text} className="tooltip__helper" />
            </button>
        )
    }
}


const mapStateToProps = state => ({
    screen: screenData(state)
});

export default connect(mapStateToProps)(Tooltip)
