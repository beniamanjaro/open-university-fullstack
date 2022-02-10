const initialState = "";

const notificationReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(action.delay);
      return action.data;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: message });
    setTimeout(() => dispatch(removeNotification()), time * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default notificationReducer;
