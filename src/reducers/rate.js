const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_RATE':
            return action.payload;
        case 'REMOVE_RATE':
            return false;
        default:
            return state;
    }
};

export default reducer
