import {store} from "../index";
import {wssInit} from "./socket";
import {findInBuffer} from "./searchInBuffer";
import {deflateSync} from "browserify-zlib";

// const setOperation = (type, command, params = '', callback = '') => {
//
//     const defaultUrl = store.getState().node.link;
//
//     params = JSON.stringify(params ? params : {data: ''});
//     callback = callback || (e => e);
//
//     return fetch(`${defaultUrl}/${type}/${command}`, {
//         method: 'POST', body: params })
//         .then(response => response.json())
//         .then(result => result.error ? false : result)
//         .then(e => callback(e))
//         .catch(() => false);
// };
//
// export const chainOperation = (...args) => setOperation('chain', ...args);
//
// export const historyOperation = (...args) => setOperation('history', ...args);
//
// // export const dbOperation = (...args) => setOperation('db_size', ...args);
//
// // export const setWallet = (...args) => setOperation('wallet', ...args);
//
// export default setOperation;

let increment = 0;

export const chainOperation = async (command, params = '', callback = '') => {
    let {wss} = store.getState();
    if(!wss) return wssInit().then(() => chainOperation(command, params, callback));
    const idRequest = increment;
    increment++;

    params = JSON.stringify(params ? params : {data: ''});
    callback = callback || (e => e);

    const response = await new Promise((resolve,reject) => {
        const requestData = deflateSync(`${idRequest}\n/v1/chain/${command}\n${params}`).toString('base64');

        sendSocket(idRequest, requestData).then(e => {resolve(e)});
    });

    return callback ? callback(response) : response;
};


const sendSocket = async (id, data) => {
    let {wss} = store.getState();
    wss.send(data);
    return await findInBuffer(id).then(e => {
        if (!e.data) return setTimeout(sendSocket(id, data), 1000);
        store.dispatch({
            type: 'UPD_BUFFER',
            data: store.getState().wssBuffer.filter(el => Number(el.id) !== id)
        });
        return e.data;
    });
};
