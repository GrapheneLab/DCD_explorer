import {chainOperation} from "../index";
import {weightToEOS} from "../getData/getVoteWeight";
import {getBackendData} from "../getData/getBackendData";

function VotingData({last_vote_weight, proxy, is_proxy, producers, proxied_vote_weight = false, staked}){
    this.weight = last_vote_weight || 0;
    this.staked = staked / 10000;
    this.proxy = proxy || false;
    this.voters = producers || [];
    this.proxied_vote_weight = proxied_vote_weight;
    this.isProxy = is_proxy > 0;
    this.countVoters = 0;
}

const getProxyVotes = async (proxyName) => (
    await chainOperation('get_account', {account_name: proxyName})
        .then(proxy => proxy.voter_info.producers)
);

export const formVotingData = async (name, data) => {
    if(!data) return false;

    const votingData = new VotingData(data);

    if(votingData.proxy){
        votingData.voters = await getProxyVotes(votingData.proxy)
    }

    // if(votingData.isProxy){
    //     await getBackendData('cup', {name}).then(e => {
    //         votingData.countVoters = e.count;
    //         votingData.totalProxyEOS = e.total_proxied_vote_weight;
    //     });
    // }

    return votingData;
};
