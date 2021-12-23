export const validateFields = (data) => {
    let allErrors = {};

    for(let i in data){
        let result = '';

        if(!data[i]){
            continue;
        }

        switch(i){
            case 'amount':
                result = validateNumber(data[i]) || validateFinalAmount(data['from'], data['finalAmount']);
                break;
            case 'stealthAmount':
                result = validateNumber(data[i]) || validateStealthAmount(data['selectedChecks'], data['finalAmount']);
                break;
            case 'password':
                result = {
                    error: data[i].length < 7,
                    text: 'Password must contain 7 letters or more'
                };
                break;
            case 'brainkey':
                let phraseToArr = data[i].split(' '),
                    error = phraseToArr.length !== 12 || !phraseToArr[11];

                result = {
                    error: error,
                    text: 'Phrase must contain 12 words'
                };
                break;
            case 'passwordCheck':
                result = passCheck(data['password'], data[i]);
                break;
        }

        const {error, text} = result;

        error ?
            allErrors[i] = text : '';
    }

    Object.keys(allErrors).length === 0 ?
        allErrors = '' : '';

    return allErrors;
};

const passCheck = (password, passwordCheck) => {
    let result = {
        error: true
    };

    if(!password){
        result['text'] = 'You need to enter the password.';
        return result
    }

    if(password !== passwordCheck){
        result['text'] = 'Passwords doesn\'t match.';
        return result
    }

    result['error'] = false;

    return result;
};

const validateNumber = (amount) => {

    let result = {
        error: true
    };

    if(isNaN(amount)){
        result['text'] = 'Entered data is not a number. Please, enter the number.';
        return result;
    } else if(Number(amount) <= 0){
        result['text'] = 'You can\'t enter a value equal pr less than null. Please, enter another number.';
        return result;
    }

    result['error'] = false;

    return result;
};

const validateFinalAmount = (data, finalAmount) => {
    const {from, currency} = data;
    const storeData = store.getState();
    const activeUser = storeData.accountsList[from];
    const userBalance = activeUser.balancesList[currency].money;

    let result = {error: true};

    if(Number(userBalance) < Number(finalAmount)){
        result['text'] = 'You don\'t have enough money in that currency. Please, select another currency.';
        return result;
    }

    result['error'] = false;

    return result;
}

const validateStealthAmount = (selectedChecks, finalAmount) => {

    let result = {error: true};

    if(Number(selectedChecks.summ) <  finalAmount){
        result['text'] = 'The total summ exceeds the amount on the account.';
        return result;
    }

    result['error'] = false;

    return result;
};