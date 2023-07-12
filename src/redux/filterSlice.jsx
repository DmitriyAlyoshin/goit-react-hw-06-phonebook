import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    // setContactFilter: (state, action) => action.payload,
    setContactFilter: (_, { payload }) => payload,
  },
});

// export const filterReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case SET_FILTER:
//       return payload;
//     default:
//       return state;
//   }
// };

export const { setContactFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
