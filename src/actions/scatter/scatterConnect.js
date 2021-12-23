import ScatterJS from "scatterjs-core";
import {Api} from "eosjs";
import {store} from "../../index";
import {defaultNetwork, rpc, scatterAppName} from "./networkSetting";
import {setScatter} from "../../dispatch/setScatter";

export const scatterConnect = async () => {
    const dispatch = store.dispatch;
    const scatter = ScatterJS.scatter;

    const connect = await scatter.connect(scatterAppName, {network: defaultNetwork});

    if(!connect) return false;

    await dispatch(setScatter({
        connect: true,
        network: ScatterJS.eos(defaultNetwork, Api, {rpc, beta3:true})
    }));

    return true;
};
