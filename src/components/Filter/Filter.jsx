import { useDispatch, useSelector } from 'react-redux';
import { getContactFilter } from 'redux/selectors';
import { setContactFilter } from 'redux/filterSlice';

import { Wrapper, Label, Input } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getContactFilter);

  const changeFilter = e => {
    dispatch(setContactFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <Wrapper>
      <Label htmlFor="filter">Find contacts by name</Label>
      <Input
        name="filter"
        type="text"
        id="filter"
        value={filter}
        onChange={changeFilter}
        
        // onChange={e => dispatch(setContactFilter(e.currentTarget.value))}

        placeholder="Search..."
      />
    </Wrapper>
  );
};
