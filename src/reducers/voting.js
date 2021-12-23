const defaultState = {
    account: '',
    proxy: '',
    producers: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_VOTE':
            return {...action.payload};
        case 'CHANGE_VOTE':
            return {...defaultState};
        default:
            return state;
    }
};

export default reducer

