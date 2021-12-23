import React, {Component} from 'react';
import Translate from "react-translate-component";

class Alert extends Component {
    state = {
        min: false
    };

    hide = () => {
      this.setState({min: !this.state.min})
    };

    render() {
        const {data} = this.props;
        const {min} = this.state;
        return (
            <div className={`alert${data.show ? ' alert--show' : ''}${min ? ' min' : ''}`} onClick={this.hide}>
                {data.text &&
                    <Translate component='p' content={`alert.${data.text}`} />
                }
            </div>
        )
    }
};

export default Alert;

