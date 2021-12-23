import {addNumSpaces, dateToLocal} from "../dateNumFuncs";
import {setInternalLink} from "./wrappers";
import {setHistoryDescription, setHistoryType} from "../historyHandlers/";

export const trxListDecorator = {
    block: ({block}) => setInternalLink('/block/', addNumSpaces(block), block),
    trx_id: ({trx_id}) => setInternalLink('/trx/', `${trx_id.substr(0, 12)}...`, trx_id),
    created: ({created}) => dateToLocal(created),
    type: ({type}) => setHistoryType(type, 'eosio.token'),
    info: ({type, data}) => setHistoryDescription(type, data, 'eosio.token')
};
