export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const editIdRoom = (id) => {
  return {
    type: "EDIT_ID_ROOM",
    payload: id,
  };
};
