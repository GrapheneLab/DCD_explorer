import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import {getBackendData} from "../../actions/getData/getBackendData";
import Table from "../table/table";
import {setDefaultNumber} from "../../actions";
import Btn from "../helpers/btn";
import {weightToEOS} from "../../actions/getData/getVoteWeight";
import {coreToken} from "../../reducers";
import {connect} from "react-redux";
import {PreLoader} from "../helpers/preloader";
import {voteDecor} from "../../actions/tableDecoration/voteDecorator";

const getProxyVoteList = async (proxy, boundary, offset) => await getBackendData('gpl', {proxy, boundary ,offset}).then(e => e);

class UserProxyList extends Component {
    state = {
        voteList: false,
        more: true
    };

    componentDidMount(){
        this.getBasicData();
    }

    hide = () => {
        window.scrollTo(0, ReactDOM.findDOMNode(this).offsetTop);
        this.setState({voteList: false, more: false}, () => this.getBasicData());
    };

    getBasicData = () => getProxyVoteList(this.props.name, '0', '10').then(e => this.setState({voteList: e, more: e.length === 10}));

    showMore = () => {
        const voteList = this.state.voteList;
        const boundary = voteList.length.toString();
        getProxyVoteList(this.props.name, boundary, '25').then(e => this.setState({voteList: e ? voteList.concat(e) : voteList, more: e.length === 25}));
    };

    render(){
        const count = Number(this.props.count);
        const {voteList, more} = this.state;

        if (!voteList) {
            return <PreLoader />
        }

        const thead = [
            {key: 'name', title: 'name'},
            {key: 'last_vote_weight', title: 'eosVotes'}
        ];

        const classNames = {
            table: 'text--grey'
        };

        const tableData = voteList.map((elem, index) => ({
            id: index,
            name: elem.name,
            last_vote_weight: setDefaultNumber(weightToEOS(elem.last_vote_weight)) + ' ' + this.props.token,
        }));

        return <Fragment>
            <Table head={thead} data={tableData} classNames={classNames} decorate={voteDecor} onEmpty="account.proxyTable" />
            {(more || voteList.length < count) && voteList.length !== count &&
            <div className="col-md-12 show__wrapper">
                {tableData.length > 10 &&
                <Btn type='hide' className="text--md upper link--ghost" handleClick={this.hide}/>
                }
                <Btn type='showMore' className="text--md upper link--ghost" handleClick={this.showMore}
                     additionalData={` (${voteList.length}/${count})`}/>
            </div>
            }
        </Fragment>
    }
}


const mapStateToProps = state => ({
    token: coreToken(state),
});

export default connect(mapStateToProps)(UserProxyList);
