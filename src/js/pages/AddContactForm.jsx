import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Provider.jsx';
import { contactListActions } from '../../js/context/actions/contactListActions';
import { v4 as uuidv4 } from 'uuid';

export default function AddContactForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

 const handleFormSubmit = (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('formFile');
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    const newContact = {
      id: uuidv4(), // generate a unique id
      full_name: fullName,
      email,
      phone,
      address,
      image: reader.result,
    };
  
    dispatch(contactListActions.addContact(newContact));
    navigate('/'); // back to the ContactListPage
  
    // Reset form fields
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onloadend();
  }
};


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>Add New Contact</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label"> 
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
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
              placeholder="Enter Address"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Image:
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>

          <button type="submit" className="btn btn-primary mx-2">
            Save Contact
          </button>

          <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/')}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
