const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
        case 'REMOVE_TOKEN':
            return false;
        default:
            return state;
    }
};

export default reducer
