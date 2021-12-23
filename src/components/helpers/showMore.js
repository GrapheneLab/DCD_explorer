import React, {Component} from "react";
import Btn from "./btn";

class ShowMore extends Component{
    state = {
        opened: false
    };

    render(){

        const opened = this.state.opened;
        const {type, children} = this.props;
        const btnType = `${type}.${!opened ? 'show' : 'hide'}`;

        return (
            <div className={`show-more${opened ? ' show-more--open' : ''}`}>
                <Btn
                    type={btnType}
                    className="link--ghost"
                    handleClick={() => this.setState({opened: !opened})}
                />
                <div className="show-more__text">
                    { children }
                </div>
            </div>
        )
    }
}

export default ShowMore;