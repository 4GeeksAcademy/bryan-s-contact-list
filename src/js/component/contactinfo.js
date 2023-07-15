import React from 'react';
import { Link } from 'react-router-dom';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import defaultImage from '../../img/default-icon-contact.jpg';

const ContactInfo = ({ contact }) => {
  return (
    <div className="d-flex align-items-center">
      <img src={contact.image || defaultImage} alt='contact'
        className="rounded-circle mr-5 mx-4"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
     <div>
        <h3>{contact.full_name}</h3>
        <p><Envelope /> {contact.email}</p>
        <p><Telephone /> {contact.phone}</p>
        <p><GeoAlt /> {contact.address}</p>
    </div>
    </div>
  );
};

export default ContactInfo;
