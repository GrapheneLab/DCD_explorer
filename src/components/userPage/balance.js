import React, {Fragment} from 'react';
import {setDefaultNumber} from "../../actions";
import Translate from "react-translate-component";
import SwitchValue from "../helpers/switchValue";
import RefundTimer from "./refundTimer";
import {EOS, IconBlock} from "../../svg";
import {connect} from "react-redux";
import {price} from "../../reducers";

const Balance = ({balance, producer = false, token = 'EOS', price}) => {
    const {
        unstacked,
        stacked,
        delegated,
        refund,
        refundTime,
        totalBalance
    } = balance;

    const {
        claimedRewards,
        unclaimedReward,
        lastClaimTime
    } = producer;

    const lastClaim = lastClaimTime ? <Translate content="account.lastClaimTime" className="text--sm lower text--light" with={{lastClaimTime}}/> : '';

    let refundTimer = '';

    if(refund > 0){
        refundTimer = new Date(refundTime).getTime() + 72*60*60*1000 > Date.now()
            ? <RefundTimer date={refundTime}/>
            : <Translate content="account.refundClaimNow" className='text--light lower'/>;
    }

    const fundArray = [
        {sum: unstacked, type: 'liquid'},
        {sum: refund, type: 'refund', timer: refundTimer},
        {sum: stacked, type: 'staked'},
        {sum: delegated, type: 'delegated'}
    ];

    const producerClaims = producer && [
        {type: claimedRewards, ico: <EOS/>, text: 'reward', condition: Boolean(claimedRewards)},
        {type: unclaimedReward, ico: <IconBlock/>, text: 'unpaid', condition: Boolean(unclaimedReward >= 100 && !lastClaimTime), data: lastClaim},
    ];

    return (
        <div className={`card personal__card personal__balance ${producer ? 'BP' : ''}`}>
            {producerClaims &&
                producerClaims.map(el => (
                    <div className="total" key={el.text}>
                        <span className="total__ico">
                            {el.ico}
                        </span>
                        <p className="total__value">
                            <Translate content={`account.${el.text}`} className='title' date={el.date}/>
                            {el.condition
                                ? <SwitchValue>
                                    {`${setDefaultNumber(el.type)} ${token}`}
                                    {`${setDefaultNumber(el.type * price, 2)} USD`}
                                </SwitchValue>
                                : <span className="switch-value__text">0 {token}</span>
                            }
                        </p>
                    </div>
                ))
            }
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

            <div className="scales big">
                {fundArray.map(fund => (
                    <div className="scales__item text--md" key={fund.type}>
                        <Translate content={`account.${fund.type}`} component="p" className='scales__title title text--sm' timer={fund.timer && fund.timer}/>
                        <span className="scales__percent">
                            {fund.sum / totalBalance * 100 > 0 &&
                            <span className="value" style={{width: fund.sum / totalBalance * 100 + '%'}}/>
                            }
                        </span>
                        <span>{fund.sum} {token}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    price: price(state)
});

export default connect(mapStateToProps)(Balance)
