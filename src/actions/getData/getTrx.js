import {chainOperation, historyOperation} from "../configRequests";

export const getData = async (id) => await historyOperation('get_transaction', {id});

export const getSchedule = async (lower_bound) => await chainOperation(
    'get_scheduled_transactions',
    { lower_bound, limit: 1, json: true }
);
