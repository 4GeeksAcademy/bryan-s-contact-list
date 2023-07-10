import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Provider.jsx';
import { contactListActions } from '../../js/context/actions/contactListActions';

export default function AddContactForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
      address,
    };

    dispatch(contactListActions.addContact(newContact));
    navigate('/'); // Navigate back to the ContactListPage

    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  
  return (
    <div>
      <h1>Add New Contact</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Contact
        </button>
        </form>
    </div>
  );
}