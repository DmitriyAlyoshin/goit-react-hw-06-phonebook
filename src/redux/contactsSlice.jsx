import { createSlice } from '@reduxjs/toolkit';
import { initialContacts } from 'data/initialContacts';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  list: initialContacts,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        // state.list.push(action.payload);
        return [...state, payload];
      },

      prepare: ({ id, name, number }) => {
        return {
          payload: {
            id,
            name,
            number,
          },
        };
      },
    },

    deleteContact: (state, { payload }) => {
        // state.list = state.list.filter(contact => contact.id !== action.payload);
        return state.filter(({ id }) => id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactReducer = contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;
export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactReducer
);