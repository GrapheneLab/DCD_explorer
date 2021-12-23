import React, {Component} from 'react';
import {connect} from "react-redux";
import Translate from "react-translate-component";
import {chainOperation} from "../../actions/index";
import {Avatar} from "../helpers/avatar";
import {coreToken, price} from "../../reducers";
import {setDefaultNumber} from "../../actions";
import SwitchValue from "../helpers/switchValue";
import {EOS, IconClose} from "../../svg";
import {formBalanceData, formResourcesData} from "../../actions/userActions";
import {setFixedNum} from "../../actions/dateNumFuncs";
import {Link} from "react-router-dom";
import ShowRawData from "../helpers/showRawData";

const formContractBalance = async name => {
    const data = await chainOperation('get_account', {account_name: name, json: true});
    const resources = await formResourcesData(data);
    const delegated = setFixedNum(resources.cpu.stacked.delegated_to + resources.net.stacked.delegated_to);
    const balances = formBalanceData(data, delegated);

    return Number(balances.totalBalance);
};

class ContractPage extends Component{
    state = {
        contractData: false,
        totalBalance: false,
        selectedAction: false
    };

    componentDidMount(){
        const account_name = this.props.match.params.name;
        this.setAbi(account_name);
    }

    componentWillReceiveProps(nextProps){
        if(!this.state.contractData) return;

        const newName = nextProps.match.params.name;

        if(newName !== this.state.contractData.account_name) this.setAbi(newName);
        console.log(this.state.contractData.account_name, newName);
    }

    setAbi = account_name => {
        if(!account_name){
            this.props.history.push('/404/');
            return;
        }

        const totalBalance = formContractBalance(account_name);
        const contractData = chainOperation('get_abi', { account_name });

        Promise.all([contractData, totalBalance]).then(res => {
            const [contractData, totalBalance] = res;

            this.setState({contractData, totalBalance})
        });
    };

    showAction = name => {
        const selectedAction = this.state.contractData.abi.structs.find(el => el.name === name);

        if(selectedAction) {
            const body = document.body;

            body.style.top = body.getBoundingClientRect().top + 'px';
            body.style.paddingRight = '17px';
            body.style.position = 'fixed';

            this.setState({selectedAction});
        }
    };

    clearActiveAction = () => {
        const body = document.body;
        const posTop = Math.abs(parseInt(body.style.top));
        body.removeAttribute('style');
        window.scrollTo(0, posTop);
        this.setState({selectedAction: false});
    }

    render(){
        const {contractData, totalBalance, selectedAction} = this.state;

        if(!contractData) return <span>Loading... </span>;

        const {token, price} = this.props;
        const {tables, actions} = contractData.abi;
        const contractName = contractData.account_name;

        console.log(contractData);

        return (
            <section className='container personal__page'>
                <div className="col-md-12">
                    <Translate content="contract.title" component="h2" className="heading" />
                    <div className="row personal__page">
                        <div className="col-md-6">
                            <div className="card personal__card">
                                <div>
                                    <div className="personal__name text--lg">
                                        <Avatar name={contractName} />
                                        <span className="name">
                                            <Translate content='tableHead.name' className='title'/>
                                            {contractName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card personal__card personal__balance">
                                <div className="total">
                                    <span className="total__ico">
                                        <EOS/>
                                    </span>
                                    <p className="total__value">
                                        <Translate content="account.balance" className='title'/>
                                        {totalBalance
                                            ? <SwitchValue>
                                                {`${setDefaultNumber(totalBalance)} ${token}` || `0 ${token}`}
                                                {`${setDefaultNumber(totalBalance * price, 2)} USD` || `0 USD`}
                                            </SwitchValue>
                                            : <span className="switch-value__text">0 {token}</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {Boolean(tables.length) &&
                        <div className="personal__voting">
                            <Translate content="contract.tables" component="h2" className="heading"/>
                            {tables.map((el, id) => (
                                <div key={id} className="card personal__voted text--sm">
                                    <Link to={`/contract/${contractName}/${el.name}`} className="link--ghost">
                                        {el.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    }
                    {Boolean(actions.length) &&
                        <div className="personal__voting">
                            <Translate content="contract.actions" component="h2" className="heading"/>
                            {actions.map((el, id) => (
                                <button key={id} className="card text--sm" onClick={() => this.showAction(el.name)}>
                                        {el.name}
                                </button>
                            ))}
                        </div>
                    }
                    <Translate content="contract.abi" component="h2" className="heading"/>
                    { ShowRawData(contractData.abi, 'text--sm') }
                </div>
                <div className={`modal${selectedAction ? ' open' : ''}`}>
                    <div className="modal__body">
                        <Translate content="contract.action" component="h2" className="modal__title"/>
                        <div className="modal__content">
                            <button className="btn--close" onClick={this.clearActiveAction}><IconClose/></button>
                            { ShowRawData(selectedAction, 'text--sm') }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};

const mapStateToProps = state => ({
    token: coreToken(state),
    price: price(state)
});

export default connect(mapStateToProps)(ContractPage);