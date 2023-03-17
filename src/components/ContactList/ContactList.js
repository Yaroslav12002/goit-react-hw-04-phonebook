import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import { ContactListElement } from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ContactListElement>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
            id={id}
          />
        );
      })}
    </ContactListElement>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};

export default ContactList;
