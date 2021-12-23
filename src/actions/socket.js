import {store} from "../index";
import {unzip} from "browserify-zlib";
import { getStorageValue, setStorage } from "./storage";
import {socket} from "../data/socket";

export const wssInit = async (errorSocketId) => await new Promise((resolve) => {
    const socketIndex = getStorageValue('socket');
    const socketId = socketIndex ? socketIndex : 0;
    let socketLink = socket[socketId];

    if(errorSocketId === socketId){
        socketLink = socket.length > 1 ? socket.filter(e => e !== socketLink)[0] : socketLink;
    }
    const wss = new WebSocket(socketLink);

    wss.onopen = () => {
        console.log('WSS connect: ', socketLink);
        store.dispatch({type: 'SET_WSS', data: wss});
        if(!socketIndex) setStorage('socket', socketId);
        resolve(true)
    };

    wss.onmessage = async (event) => {
        const buffer = Buffer.from(event.data, 'base64');
        unzip(buffer, (err, buffer) => {
            if (!err) {
                const response = buffer.toString().split('\n');
                const wssBuffer = store.getState().wssBuffer;
                const newElem = {id: response[0], data: JSON.parse(response[2])};
                store.dispatch({type: 'UPD_BUFFER', data: wssBuffer.concat(newElem)});
                return buffer.toString();
            } else {
                return err
            }
        });
    };

    wss.onerror = (error) => { console.log("Error " + error.message) };

    wss.onclose = (event) => {
        if(!event.wasClean){
            console.log('Connection fall, try reconnect', event);
            return setTimeout(() => {
                store.dispatch({type: 'SET_WSS', data: false});
                wssInit(socketId).then(e => e)
            }, 500);
        }
        console.log('Connection closed cleanly ');
    };
});
