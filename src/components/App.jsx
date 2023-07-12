import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';

export const App = () => {
  return (
    <Container>
      <Title>PHONEBOOK</Title>
      <ContactForm />

      <Subtitle>CONTACTS</Subtitle>
      <Filter />
      <ContactList />
    </Container>
  );
};
