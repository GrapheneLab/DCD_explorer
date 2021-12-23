const reducer = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_OVERLAY':
            return 'open-overlay';

        case 'OPEN_SIDEBAR':
            return 'open-sidebar';

        case 'CLOSE':
            return false;

        default:
            return state
    }
};

export default reducer
