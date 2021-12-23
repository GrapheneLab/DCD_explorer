import {chainOperation} from "../actions";
import {formTableParams} from "../actions/tableFuncs";

export const getCoreToken = () => async (dispatch) => {
    chainOperation('get_table_rows', formTableParams({
            table: "accounts",
            code: "eosio.token",
            scope: "eosio",
        })).then(e =>  dispatch({type: 'SET_TOKEN', payload: e.rows[0].balance.split(' ')[1]}));
};
