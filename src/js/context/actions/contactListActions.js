export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const contactListActions = {
  addContact: (data) => ({ type: ADD_CONTACT, data }),
  editContact: (data) => ({ type: EDIT_CONTACT, data }),
  deleteContact: (data) => ({ type: DELETE_CONTACT, data })
};
