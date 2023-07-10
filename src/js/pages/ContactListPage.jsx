import React, { useEffect, useContext } from 'react';
import { Context } from '../context/Provider.jsx';
import { contactListActions } from '../../js/context/actions/contactListActions';
import { Link } from 'react-router-dom';

export default function ContactListPage() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://assets.breatheco.de/apis/fake/contact/');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        dispatch(contactListActions.setContacts(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, [dispatch]);

  useEffect(() => {
    // Save contacts to localStorage when the state changes
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleAddContact = () => {
    dispatch(contactListActions.addContact({}));
  };

  return (
    <div>
      <h1>Contact List Page</h1>

      <Link to="/add-contact" className="btn btn-success">
        Add Contact
      </Link>

      <ul className="list-group mt-3">
        {state.contacts.map((contact) => (
          <li key={contact.id} className="list-group-item">
            <div>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
