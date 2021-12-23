export const updateResolution = (data) => async (dispatch) => {
    dispatch({type: 'SCREEN_UPDATE', data});
};
