import {historyOperation} from "../index";

function UserProperties(){
    this.isSmartContract = false;
    this.controlledByContract = false;
}

const checkParentAcc = async (name) => await Promise.all(
    name.split('.').map( async (elem) => {
        return await historyOperation('get_controlled_accounts', {controlling_account: elem})
            .then(e => e.controlled_accounts.filter(elem => elem.indexOf(name) === 0));
    }))
    .then(e => e.length > 0)
    .catch(() => false);

export const formUserProperties = async (data) => {
    const props = new UserProperties();

    props.isSmartContract = data.last_code_update !== '1970-01-01T00:00:00.000';
    props.controlledByContract = name.indexOf('.') > -1 ? await checkParentAcc(data.account_name) : false;

    return props;
};