import {store} from "../index";
import {sleep} from "./sleep";

export const findInBuffer = async (id) => {
    const {wssBuffer} = store.getState();
    const i = wssBuffer.findIndex(el => Number(el.id) === id);
    if(i >= 0) return wssBuffer[i];

    await sleep(25);
    return findInBuffer(id);
};
