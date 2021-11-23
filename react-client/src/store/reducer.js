import { combineReducers } from "redux";

const USER = {
  uid: "",
  token: "",
  display_name: "",
};
function User(state = USER, action) {
  switch (action.type) {
    case "ADD_USER":
      const user = action.payload;
      state.uid = user.uid;
      state.token = user.token;
      state.display_name = user.display_name;
      //   console.log(state.token);
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const reducer = combineReducers({
  User,
});
