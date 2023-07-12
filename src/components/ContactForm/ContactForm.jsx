import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import { useSelector, useDispatch } from 'react-redux';

import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { customAlphabet } from 'nanoid';

import {
  Container,
  Input,
  Label,
  Wrapper,
  ErrorMsg,
  Btn,
} from './ContactForm.styled';

// const schema = Yup.object().shape({
//     name: Yup
//         .string()
//         .min(2)
//         .max(70)
//         .required(),
//     number: Yup
//         .number()
//         .min(4)
//         .required(),
// });

const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: Yup.string()
    .phone(
      'UA',
      true,
      'Phone number must be a valid phone number for region UA, digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const nanoid = customAlphabet('1234567890', 3);

const initialValues = {
  id: '',
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      number: values.number,
    };

    if (contacts.find(contact => contact.name === newContact.name)) {
      return toast.error(`${newContact.name} is already in contacts`);
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Container>
          <Wrapper>
            <Label htmlFor="name">Name:</Label>
                      <Input
                          name="name"
                          type="text"
                          id="name"
                          placeholder="Contact Name" />
            <ErrorMsg name="name" component="div" />
          </Wrapper>

          <Wrapper>
            <Label htmlFor="number">Number:</Label>
            <Input
              name="number"
              type="tel"
              id="number"
              placeholder="+38-050-123-45-67"
            />
            <ErrorMsg name="number" component="div" />
          </Wrapper>

          <Btn type="submit">Add contact</Btn>
        </Container>
      </Formik>
      <ToastContainer />
    </>
  );
};
