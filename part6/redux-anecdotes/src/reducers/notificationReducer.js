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

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: message,
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default notificationReducer;
