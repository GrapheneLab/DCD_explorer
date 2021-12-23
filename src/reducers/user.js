const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data;
        case 'LOGOUT':
            return '';
        default:
            return state;
    }
};

export default reducer
