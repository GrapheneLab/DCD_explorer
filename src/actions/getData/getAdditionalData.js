import {historyOperation} from "../configRequests";

export const getAdditionalData = async (name, lastPos, acc = [], offset = -100) => {
    return await historyOperation('get_actions', {account_name: name, pos: Number(lastPos), offset})
        .then(e => e.actions.reverse())
        .catch(() => []);
};
