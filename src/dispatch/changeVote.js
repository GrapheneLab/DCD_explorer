import {store} from "../index";

export const changeVote = ({type, data}) => async (dispatch) => {

    if(!type && !data){
        await dispatch({type: 'CLEAN_VOTE'});
        return;
    }

    let votingData = store.getState().voting;

    switch(type){
        case 'account':
            votingData.proxy = data.proxy;
            votingData.producers = data.producers;
            break;

        case 'proxy':
            votingData.producers = [];
            votingData.proxy = votingData.proxy !== data ? data : '';
            break;

        case 'producers':
            votingData.proxy = '';
            votingData.producers = votingData.producers.includes(data)
                ? votingData.producers.filter(el => el !== data)
                : [...votingData.producers, data];
            break;

        default:
            votingData[type] = data
    }

    await dispatch({type: 'CHANGE_VOTE', payload: votingData});
};
