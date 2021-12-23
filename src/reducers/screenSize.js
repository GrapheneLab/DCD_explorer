/*
* default size:
* 0 - mobile
* 1 - tablet
* 2 - desktop
* */

const reducer = (state = 2, action) => {
    switch (action.type) {
        case 'SCREEN_UPDATE':
            return action.data;
        default:
            return state;
    }
};

export default reducer
