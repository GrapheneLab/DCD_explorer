const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NODE':
            return action.data;
        default:
            return state;
    }
};

export default reducer