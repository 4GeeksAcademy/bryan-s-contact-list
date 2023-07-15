import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../context/Provider';
import { contactListActions } from '../../js/context/actions/contactListActions';
import { Link, useLocation } from 'react-router-dom';
import ContactInfo from '../component/contactinfo.js';

export default function ContactListPage() {
  const { state, dispatch } = useContext(Context);
  const location = useLocation();

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://assets.breatheco.de/apis/fake/contact/agenda/my_agenda');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      dispatch(contactListActions.setContacts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [dispatch, location]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleDeleteContact = (contactId) => {
    console.log(`Deleting contact with id: ${contactId}`);
    dispatch(contactListActions.deleteContact(contactId));
  };
  
  return (
    <div>

      <div className="d-flex justify-content-end">
        <Link to="/add-contact" className="btn btn-success mx-5">
          Add New Contact
        </Link>
      </div>

      {state.contacts.length === 0 && (
        <ul className="list-group mt-3 mx-5">
          <li className="list-group-item d-flex justify-content-center align-items-center pholder">
            <div className="row font-weight-bold">
              <p className="text-muted mt-3">Add New Contacts</p>
            </div>
          </li>
        </ul>
      )}

      <ul className="list-group mt-3 mx-5 list-contacts">
        {state.contacts.map((contact) => (
          <li key={contact.id} className="list-group-item d-flex align-items-center justify-content-between">
            <ContactInfo contact={contact} />
            <div className="d-flex justify-content-end">
              <Link to={`/edit-contact/${contact.id}`} className="btn btn-lg mr-2">
                <i className="bi bi-pencil"></i> {/* Edit icon */}
              </Link>
              <button className="btn btn-lg" onClick={() => {
                if (window.confirm('Are you sure you want to delete this contact?')) {
                  handleDeleteContact(contact.id);
                }
              }}>
                <i className="bi bi-trash"></i> {/* Delete icon */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}