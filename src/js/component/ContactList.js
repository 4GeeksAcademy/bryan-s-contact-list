import React, { useEffect, useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/contact/')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.full_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
