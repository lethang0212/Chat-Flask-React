import { combineReducers } from "redux";

const USER = {
  uid: "",
  token: "",
  display_name: "",
  ID: {
    id: 0,
  },
};
function User(state = USER, action) {
  switch (action.type) {
    case "ADD_USER":
      const user = action.payload;
      state.uid = user.uid;
      state.token = user.token;
      state.display_name = user.display_name;
      return {
        ...state,
      };
    case "EDIT_ID_ROOM":
      state.ID.id = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}

// function Id(state = ID, action) {
//   switch (action.type) {
//     case "EDIT_ID_ROOM":
//       state.id = action.payload;
//       return { ...state };
//     default:
//       return state;
//   }
// }

export const reducer = combineReducers({
  User,
});
