import {setDefaultNumber, setFixedNum} from "../dateNumFuncs";

const weight = Math.floor(((new Date().getTime() / 1000)-946684800)/(3600*24*7)) / 52;

const precision = 10000;

export const weightToEOS = (votes) => setFixedNum((Number(votes) / Math.pow(2, weight)) / precision);
export const EOStoWeight = (stacked) => setDefaultNumber((stacked * precision) * Math.pow(2, weight));
