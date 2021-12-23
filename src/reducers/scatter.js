const reducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_SCATTER':
            return action.data;
        case 'CLOSE_SCATTER':
            return false;
        default:
            return state;
    }
};

export default reducer
