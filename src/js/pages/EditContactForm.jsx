import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Provider.jsx';
import { contactListActions } from '../../js/context/actions/contactListActions';
import defaultImage from '../../img/default-icon-contact.jpg';

export default function EditContactForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // get the contact id from the URL
  const { state, dispatch } = useContext(Context);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    const contact = state.contacts.find((contact) => contact.id === id);
    if (contact) {
      setFullName(contact.full_name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setAddress(contact.address);
      setImage(contact.image || defaultImage);
    }
  }, [id, state.contacts]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setImage(reader.result);
    };
  
    reader.readAsDataURL(file);
  };  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      id,
      full_name: fullName,
      email,
      phone,
      address,
      image,
    };

    dispatch(contactListActions.editContact(updatedContact));
    navigate('/'); // back to the ContactListPage

    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setImage(defaultImage);
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
            <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
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
