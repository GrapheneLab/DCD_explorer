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

const getProducerVote = async (producer, boundary, offset) => await getBackendData('gvl', {producer, boundary ,offset}).then(e => e);

class UserVoteList extends Component {
    state = {
        voteList: false,
        more: true
    };

    componentDidMount(){
        this.getDefaultVotes();
    }

    showMore = () => {
        const voteList = this.state.voteList;
        const boundary = voteList.length.toString();
        getProducerVote(this.props.name, boundary, '25').then(e => this.setState({voteList: voteList.concat(e), more: e.length === 25}));
    };

    hide = () => {
        window.scrollTo(0, ReactDOM.findDOMNode(this).offsetTop);
        this.setState({voteList: false, more: false}, () => this.getDefaultVotes());
    };

    getDefaultVotes = () => {
        getProducerVote(this.props.name, '0', '10').then(e => this.setState({voteList: e ? e : [], more: e.length === 10}));
    };

    render(){
        const {count} = this.props;
        const {voteList, more} = this.state;

        if (!voteList) {
            return <PreLoader />
        }

        const thead = [
            {key: 'name', title: 'name'},
            {key: 'last_vote_weight', title: 'eosVotes'},
            {key: 'proxy', title: 'proxy'}
        ];

        const classNames = {
            table: 'text--grey'
        };

        const tableData = voteList.map(elem => ({
            id: elem.name,
            name: elem.name,
            last_vote_weight: setDefaultNumber(weightToEOS(elem.last_vote_weight)) + ' ' + this.props.token,
            proxy: elem.proxied_vote_weight > 0 ? 'Proxy' : ''
        }));

        return <Fragment>
            <Table head={thead} data={tableData} classNames={classNames} decorate={voteDecor} onEmpty="account.votersList" />
            {more &&
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

export default connect(mapStateToProps)(UserVoteList);
