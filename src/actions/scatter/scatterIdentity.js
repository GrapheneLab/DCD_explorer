import ScatterJS from "scatterjs-core";
import {chainOperation} from "../configRequests";
import {store} from "../../index";
import {setUser} from "../../dispatch/setUser";
import {changeVote} from "../../dispatch";

export const scatterIdentity = async () => ScatterJS.login()
    .then(async id => !id
        ? console.error('no identity')
        : await getUserData(ScatterJS.account('eos').name)
);

const getUserData = async (name) => chainOperation('get_account', {account_name: name, json: true})
    .then(async e => {
        const data = e.voter_info;
        if(data.producers < 30 && !data.proxy) data.producers.push('blockchained');

        await store.dispatch(setUser(data.owner));
        await store.dispatch(changeVote({
            type: 'account',
            data: {
                proxy: data.proxy,
                producers: data.producers
            }
        }));

        return data;
    });
