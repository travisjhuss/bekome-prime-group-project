import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function StatePicker() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user_type } = useSelector((store) => store.user);
  const states = useSelector((store) => store.preferences).filter(
    (item) => item.category === 'states'
  );

  return (
    <FormControl variant="filled">
      <InputLabel id="state-picker">State</InputLabel>
      <Select
        labelId="state-picker"
        value={states.find((state) => preferences.includes(state.id)) || ''}
        onChange={handlePickState}
      >
        {states.map((state) => {
          return <MenuItem value={state.id}>{state.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default StatePicker;
