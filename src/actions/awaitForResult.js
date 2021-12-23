import {store} from '../index';
import {removeLoader, setLoader} from "../dispatch/loaderDispatch";

export const awaitForResult = async (func) => {

    const dispatch = store.dispatch;

    dispatch(setLoader());

    let fetchResult = await func;

    dispatch(removeLoader());

    return fetchResult;

};