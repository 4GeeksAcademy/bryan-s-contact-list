import React, { createContext, useReducer } from 'react';
import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  SET_CONTACTS
} from '../context/actions/contactListActions';

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const existingContact = state.contacts.find((contact) => contact.id === action.data.id);
      if (existingContact) {
        return state; // Contact already exists, no need to add it again
      } else {
        return {
          ...state,
          contacts: [...state.contacts, action.data],
          isContactAdded: true,
        };
      }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.data.id ? action.data : contact
        ),
      };
    case DELETE_CONTACT:
      console.log(`Deleting contact with id: ${action.data}`);
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.data),
      };
    case SET_CONTACTS:
      const newContacts = action.data.filter(
        (contact) => !state.contacts.some((c) => c.id === contact.id)
      );
      return {
        ...state,
        contacts: [...state.contacts, ...newContacts],
      };
    default:
      return state;
  }
};

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [],
  isContactAdded: JSON.parse(localStorage.getItem('isContactAdded')) || false,
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
