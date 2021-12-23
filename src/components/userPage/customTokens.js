import React, {Component, Fragment} from 'react';
import Translate from "react-translate-component";
import {Link} from "react-router-dom";
import {EOS} from "../../svg";
import {chainOperation} from "../../actions";
import {PreLoader} from "../helpers/preloader";
import Btn from "../helpers/btn";
import {tokensLogos} from "../../data/tokenLogos";

const getTokens = async (account) => await chainOperation('get_currency_balances', {account}).then(e => e);

class CustomTokens extends Component {
    state = {
        data: false,
        showAll: false
    };

    componentDidMount(){
        getTokens(this.props.name).then(e => {
            this.setState({data: e.filter(el => el.symbol !== 'EOS')});
        })
    }

    toggleList = () => {
        this.setState(prevState => ({
            showAll: !prevState.showAll
        }));
    };

    render() {
        const {data, showAll} = this.state;

        if(!data) return '';

        if(data.length === 0) return '';

        const tokens = showAll ? data : data.slice(0,4);

        return (
            <Fragment>
                <Translate content="account.tokens" component="h2" className="col-md-12 heading" />
                <div className="tokens">
                    { showAll ? data : data.slice(0, 4) }
                    {tokens.map(({symbol, code, amount}) => (
                        <div className='col-md-3' key={symbol}>
                            <div className='card tokens__item'>
                                <span className="key__ico">
                                    { !tokensLogos[symbol]
                                        ? <EOS/>
                                        : <img src={tokensLogos[symbol]} alt={symbol} />
                                    }
                                </span>
                                <div className="tokens__desc">
                                    <span className='tokens__symbol text--lg'>{symbol}</span>
                                    <Link className='link--ghost'
                                          to={`/accounts/${code}`}>{code}</Link>
                                    <span className='tokens__amount text--md'>{amount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    data.length > 4 &&
                    <div className="col-md-12 accounts__actions">
                        <Btn type={showAll ? 'hide' : 'showAll'} className="text--md link--ghost upper" handleClick={this.toggleList} additionalData={` (${data.length})`} />
                    </div>
                }
            </Fragment>
        );
    }
}

export default CustomTokens
