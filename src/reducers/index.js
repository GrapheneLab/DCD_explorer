import {combineReducers, createStore} from 'redux'
import {routerReducer} from 'react-router-redux'

///// create folders and exports to this file
///// example:
import authorization from './authorization/'
import node from "./node";
import overlay from "./overlay";
import loader from "./loader";
import token from "./coreToken";
import rate from "./rate";
import screenSize from "./screenSize";
import alert from "./alert";
import user from "./user";
import scatter from "./scatter";
import voting from "./voting";
import wss from "./wss";
import wssBuffer from "./wssBuffer";

///// create combineReducers for all import reducer
const app = combineReducers({
    routing: routerReducer,
    authorization,
    node,
    loader,
    overlay,
    token,
    rate,
    screenSize,
    alert,
    user,
    voting,
    scatter,
    wss,
    wssBuffer,
});

///// export simple variables example:
export const modalData = state => state.modal;
export const screenData = state => state.screenSize;
export const overlayData = state => state.overlay;
export const loaderData = state => state.loader;
export const nodeInfo = state => state.node;
export const price = state => state.rate;
export const coreToken = state => state.token;
export const pathName = state => state.routing.location.pathname;
export const alertData = state => state.alert;
export const reduxUser = state => state.user;
export const reduxVoting = state => state.voting;
export const reduxScatter = state => state.scatter;
export const getWSS = state => state.wss;
export const getBuffer = state => state.wssBuffer;

///// export combine
export default app

