import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import ContactForm from './ContactForm/Contactform';
import ContactList from './ContactList';
import Filter from './Filter';

export function App() {
  const INITAIL_VALUE = [
    { name: 'Welcome to', number: '1234-567801', id: 'qucrmobV8' },
    { name: 'ContactBook application', number: '1234-5678', id: 'qucrmobV9' },
  ];

  const [contacts, setContacts] = useState(() => {
    const contactsLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLocalStorage);
    return parsedContacts ? [...parsedContacts] : INITAIL_VALUE;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // -------------------------//
  // Add and Delete contact   //
  // -------------------------//
  const addContact = (newContact, resetForm) => {
    const findContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (findContact) {
      Notify.failure(`${newContact.name} is already in contact`);
      return;
    }

    setContacts(contacts => [...contacts, newContact]);

    resetForm();
  };

  const deleteContact = idForDelete => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== idForDelete)
    );
  };

  // -------------------------//
  // Filter                   //
  // -------------------------//
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
