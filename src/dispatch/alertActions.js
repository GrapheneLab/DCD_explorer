let timeout = '';

export const setAlert = (text) => async (dispatch) => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => dispatch(removeAlert()), 6 * 1000);
    dispatch({type: 'SET_ALERT', text});
};
export const removeAlert = () => async (dispatch) => dispatch({type: 'REMOVE_ALERT'});
