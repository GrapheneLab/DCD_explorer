import React, {Component} from 'react';
import {IconTransfer} from "../../svg";

class SwitchValue extends Component{
    state = {
        showAdditionalData: false
    };

    changeData = () => this.setState({showAdditionalData: !this.state.showAdditionalData});

    render(){

        const children = this.props.children;

        return(
            <span className="switch-value">
                <span className="switch-value__text">
                    {!this.state.showAdditionalData
                        ? children[0]
                        : children[1]
                    }
                </span>
                <button className="switch-value__btn" onClick={this.changeData} aria-label="change EOS/USD">
                    <IconTransfer  />
                </button>
            </span>
        )
    }
}

export default SwitchValue;
