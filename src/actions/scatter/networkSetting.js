import ScatterJS from "scatterjs-core";
import {JsonRpc} from "eosjs";

const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

export const networkSetting = {
    blockchain: 'eos',
    host: 'eos.greymass.com',
    port: '443',
    protocol: 'https'
};

export const defaultNetwork = ScatterJS.Network.fromJson({...networkSetting, chainId});

export const rpc = new JsonRpc(defaultNetwork.fullhost());

export const scatterAppName = 'EOS Explorer';
