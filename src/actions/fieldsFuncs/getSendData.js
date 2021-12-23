export const getDefaultSendData = (data, feeParams) => {
    if(isNaN(data['amount']) || Number(data['amount']) <= 0){
        return data;
    }

    const {from, message, amount} = data;
    const selectedUser = this.props.users[from]; // data from redux!
    let fee = feeParams.fee,
        finalAmount = 0;

    if (message.length > 0){
        const helperNonce = TransactionHelper.unique_nonce_uint64();
        const memoLength = JSON.stringify(selectedUser.account.options.memo_key).length;
        const helperLength = JSON.stringify(helperNonce).length;
        const result = (memoLength + helperLength + message.length) / 1024 * feeParams.additional;

        fee = fee + result;
    }

    finalAmount = Number(amount) + fee;

    data['fee'] = fee;
    data['finalAmount'] = finalAmount;

    return data;
};

export const getStealthSendData = (data, feeParams) => {
    if(isNaN(data['amount']) || Number(data['amount']) <= 0){
        return data;
    }

    const
        {feeWithChange, feeWithoutChange} = feeParams,
        senderBalance = stealthUser.accounts[stealthUser.activeAccount].stealthBalance, // get from redux
        checksList = senderBalance.checksList.sort((a, b) => a.money - b.money);

    let {amount} = data;

    amount = Number(amount);

    let fee = 0,
        finalAmount = 0,
        selectedChecks = [],
        selectedChecksSumm = 0;

    for(let i = 0; i < checksList.length; i++){

        let elem = checksList[i];

        selectedChecks.push(elem);
        selectedChecksSumm = selectedChecksSumm + Number(elem.money);

        if (selectedChecksSumm === amount + feeWithoutChange){
            fee = feeWithoutChange;
            finalAmount = amount + feeWithoutChange;
            break;
        } else if(selectedChecksSumm > amount + feeWithChange){
            fee = feeWithChange;
            finalAmount = amount + feeWithChange;
            break;
        }
    }

    if(!fee){
        fee = feeWithChange;
    }

    data['fee'] = fee;
    data['finalAmount'] = finalAmount;
    data['selectedChecks'] = {
        summ: selectedChecksSumm,
        list: selectedChecks
    };

    return data;
};
