const reducer = (state = [], action) => {
    switch (action.type) {
        case 'UPD_BUFFER':
            return [...action.data];
        default:
            return state;
    }
};

export default reducer
