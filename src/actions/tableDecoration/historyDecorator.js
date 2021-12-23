import {setInternalLink} from "./wrappers";
import {addNumSpaces} from "../dateNumFuncs";
import {dateToLocal} from "../index";
import {setHistoryDescription, setHistoryType} from "../historyHandlers/";

export const historyDecorator = {
    seq: ({seq}) => addNumSpaces(seq),
    trx_id: ({trx_id}) => setInternalLink('/trx/', trx_id.substr(0, 10) + '...', trx_id),
    date: ({date}) => dateToLocal(date),
    block: ({block}) => setInternalLink('/block/', addNumSpaces(block), block),
    type: ({type, author}) => setHistoryType(type, author),
    info: ({type, data, author}) => setHistoryDescription(type, data, author)
};
