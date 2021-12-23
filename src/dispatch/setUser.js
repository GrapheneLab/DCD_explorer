export const setUser = (data) => async (dispatch) => dispatch({type: 'SET_USER', data});
export const logOut = () => async (dispatch) => dispatch({type: 'LOGOUT'});
