import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  SubmitBtn,
  Label,
  LabelSpan,
  ErrorMessage,
} from './ContactForm.styled';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const initialValues = { name: '', number: '' };

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .required('Required'),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        excludeEmptyString: true,
      }
    )
    .required('Required'),
});

class ContactForm extends Component {
  render() {
    const handleSubmit = (values, { resetForm }) => {
      const { name, number } = values;
      this.props.onSubmit({ name, number, id: nanoid() }, resetForm);
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Label>
            <LabelSpan>Name</LabelSpan>
            <Field
              type="text"
              name="name"
              placeholder="Enter name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            ></Field>
            <ErrorMessage name="name" component="div" />
          </Label>
          <Label>
            <LabelSpan>Number</LabelSpan>
            <Field
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            ></Field>
            <ErrorMessage name="number" component="div" />
          </Label>
          <SubmitBtn type="submit">Add contact</SubmitBtn>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
