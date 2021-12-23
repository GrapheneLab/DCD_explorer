///// simple reducer example
const reducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_USER':
      return !!action.payload;

    case 'NOT_LOGGED_IN':
      return false;

    case 'LOG_OUT':
      return false;

    default:
      return state
  }
};

export default reducer
