import PropTypes from 'prop-types';
import { Contact, Button } from './ContactListItem.styled';

const ContactListItem = ({ name, number, onDeleteContact, id }) => {
  return (
    <Contact>
      <span>{name}</span>: <span>{number}</span>
      <Button
        type="button"
        onClick={() => {
          onDeleteContact(id);
        }}
      >
        delete
      </Button>
    </Contact>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactListItem;
