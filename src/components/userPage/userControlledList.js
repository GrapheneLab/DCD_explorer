import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {historyOperation} from "../../actions";
import {PreLoader} from "../helpers/preloader";
import {EmptyTableMessage} from "../table/table";
import Btn from "../helpers/btn";

const controlled = async (controlling_account) =>
    await historyOperation( 'get_controlled_accounts', {controlling_account})
        .then(e => e.controlled_accounts);

class UserControlledList extends Component {
    state = {
        data: false,
        showData: false,
        count: 0
    };

    componentDidMount() {
        controlled(this.props.name).then(e =>
            this.setState({data: e, showData: e.slice(0,50)})
        )
    }

    showMore = () => {
        const {showData, data} = this.state;
        this.setState({showData: [...showData, ...data.slice(showData.length, showData.length + 50)]});
    };

    hide = () => {
        window.scrollTo(0, ReactDOM.findDOMNode(this).offsetTop);
        this.setState({showData: this.state.data.slice(0, 50)});
    };

    render() {
        const {data, showData} = this.state;

        if (!data) return <PreLoader/>;

        if (data.length === 0) return <EmptyTableMessage pageName="account.controlledAccs"/>;

        return (
            <Fragment>
                <div className="personal__producer text--md">
                    {showData.map((el, index) => (
                        <Link to={`/accounts/${el}`} key={`${el}-${index}`} className="card voted__producer link--ghost">
                            {el}
                        </Link>
                    ))}
                </div>
                {showData.length < data.length &&
                    <div className="col-md-12 show__wrapper">
                        {data.length > 50 &&
                            <Btn type='hide' className="text--md upper link--ghost" handleClick={this.hide}/>
                        }
                        <Btn type='showMore' className="text--md upper link--ghost" handleClick={this.showMore}
                             additionalData={` (${showData.length}/${data.length})`}/>
                    </div>
                }
            </Fragment>

        );
    }
};

export default UserControlledList
