import {setFixedNum} from "../index";

export function Balance(){
    this.unstacked = 0;
    this.stacked = 0;
    this.refund = 0;
    this.refundTime = '';
    this.delegated = 0;
    this.totalBalance = 0;
}

const splitNumber = (string) => Number(string.split(' ')[0]);

export const formBalanceData = (data, delegated = 0) => {
    let balance = new Balance();

    balance['delegated'] = delegated;

    if(data.core_liquid_balance){
        balance['unstacked'] = splitNumber(data.core_liquid_balance);
    }

    if(data.self_delegated_bandwidth){
        const {net_weight, cpu_weight} = data.self_delegated_bandwidth;
        const net = splitNumber(net_weight);
        const cpu = splitNumber(cpu_weight);
        balance['stacked'] = setFixedNum(net + cpu);
    }

    if(data.refund_request){
        const {cpu_amount, net_amount, request_time} = data.refund_request;
        const cpu = splitNumber(cpu_amount);
        const net = splitNumber(net_amount);

        balance['refund'] = setFixedNum(net + cpu);
        balance['refundTime'] = request_time;
    }

    balance['totalBalance'] = setFixedNum(balance.unstacked + balance.stacked + balance.refund + balance.delegated);

    return balance;
};


