import { Component } from 'react';
import { Notify } from 'notiflix';
import ContactForm from './ContactForm/Contactform';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { name: 'Welcome to', number: '1234-567801', id: 'qucrmobV8' },
      { name: 'ContactBook application', number: '1234-5678', id: 'qucrmobV9' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      // console.log('Оновились Contacts, зберігаю Contacts в сховище');
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  // -------------------------//
  // Add and Delete contact   //
  // -------------------------//
  addContact = (newContact, resetForm) => {
    const findContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (findContact) {
      Notify.failure(`${newContact.name} is already in contact`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

    resetForm();
  };

  deleteContact = idForDelete => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== idForDelete),
    }));
  };

  // -------------------------//
  // Filter                   //
  // -------------------------//
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // -------------------------//
  // Render                   //
  // -------------------------//
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
