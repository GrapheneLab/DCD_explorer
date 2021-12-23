const reducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_WSS':
            return action.data;
        default:
            return state;
    }
};

export default reducer
