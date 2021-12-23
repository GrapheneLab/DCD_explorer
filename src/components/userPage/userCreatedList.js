import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {getBackendData} from "../../actions";
import {PreLoader} from "../helpers/preloader";
import Btn from "../helpers/btn";
import {EmptyTableMessage} from "../table/table";

const getCreatedList = async (name, boundary) => await getBackendData('glc', {name, boundary,offset:"50"}).then(e => e ? e : []);

class UserCreatedList extends Component {
    state ={
        data: false,
        show: true,
        count: false
    };

    componentDidMount(){
        const {name} = this.props;
        getBackendData('cua', {name}).then(e => {
            return e.count && Number(e.count) > 0
                ? getCreatedList(name, '0')
                    .then(data => this.setState({ data, show: data.length === 50, count: e.count }))
                : this.setState({data: []})
            }
        );
    }

    showMore = () => {
        const data = this.state.data;
        const boundary = data.length.toString();
        getCreatedList(this.props.name, boundary, '50').then(e => this.setState({data: data.concat(e), show: e.length === 50}));
    };

    hide = () => {
        const {data} = this.state;
        window.scrollTo(0, ReactDOM.findDOMNode(this).offsetTop);
        this.setState({data: data.slice(0,50)});
    };

    render() {
        const {data, show, count} = this.state;

        if (!data) return <PreLoader />;

        if (data.length === 0) return <EmptyTableMessage pageName="account.createdAccs" />;

        return (
            <Fragment>
                <div className="personal__producer text--md">
                    {data.map((el, index) => (
                        <Link to={`/accounts/${el}`} key={`${el}-${index}`} className="card voted__producer link--ghost">
                            {el}
                        </Link>
                    ))}
                </div>
                {show &&
                    <div className="col-md-12 show__wrapper">
                        {data.length > 50 &&
                            <Btn type='hide' className="text--md upper link--ghost" handleClick={this.hide}/>
                        }
                        <Btn type='showMore' className="text--md upper link--ghost" handleClick={this.showMore}
                             additionalData={` (${data.length}/${count})`}/>
                    </div>
                }
            </Fragment>
        );
    }
}

export default UserCreatedList
