const reducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return {show: true, text: action.text};
        case 'REMOVE_ALERT':
            return false;
        default:
            return state;
    }
};

export default reducer