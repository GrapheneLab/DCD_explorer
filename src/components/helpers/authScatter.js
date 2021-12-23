import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import {changeVote} from "../../dispatch";
import {reduxScatter, reduxUser, votingData} from "../../reducers";
import {IconLogout, IconScatter} from "../../svg";
import {logOut} from "../../dispatch/setUser";
import {scatterLogout} from "../../actions/scatter/scatterLogout";
import {scatterIdentity} from "../../actions/scatter/scatterIdentity";
import {scatterConnect} from "../../actions/scatter/scatterConnect";

class AuthScatter extends Component{

    state = {
        auth: false,
        connect: false,
    };

    componentDidMount() {
        this.indicate();
        this.connectScatter();
    }

    componentWillReceiveProps(props){
        if(props.user) this.setState({auth: true});
        this.indicate();
    }

    // setData = (data) => this.setState({auth: true, connected: true}, () => this.props.changeVote({ type:'account', data }));

    indicate = () => {};
    connectScatter = () => {};
    auth = () => {
        const {scatter, user} = this.props;
        if(scatter.connect && !user) scatterIdentity().then(() => this.setState({auth: true}));
        if(!scatter.connect) scatterConnect().then(() =>
            scatterIdentity().then(() => this.setState({auth: true}))
        );
    };

    logout = () => {
        scatterLogout().then(() => {
            this.setState({auth: false});
            this.props.logOut()
        });
    };

    render(){
        const {auth} = this.state;
        const name = this.props.user;

        return (
            <div className='btn--scatter'>
                {!auth && !name
                    ? <button className="btn--gradient" onClick={this.auth}>
                        <IconScatter />
                        <Translate content={`buttons.auth`}  />
                    </button>
                    : <div className="scatter-btn">
                        <Translate content='buttons.authBy' className='text--grey text--md'
                                   link={
                                       <Link to={`/accounts/${name}`} className='text--light link--ghost'>
                                           {name}
                                       </Link>
                                   }
                        />
                        <button className="scatter-btn__logout" onClick={this.logout}>
                            <IconLogout />
                        </button>
                    </div>

                }
            </div>
        )
    }
}



const mapStateToProps = state => ({
    user: reduxUser(state),
    scatter: reduxScatter(state)
});

export default connect(mapStateToProps, {logOut, changeVote})(AuthScatter)
