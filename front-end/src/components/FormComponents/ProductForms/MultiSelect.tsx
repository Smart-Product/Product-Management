import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IMeatTypes } from '../../../interface/IMeatTypes';

export const MultiSelect: React.FC<{listTypes: IMeatTypes[] | null}> = ({listTypes}) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl size="medium">
      <InputLabel id="demo-select-small-label">Tipo de Corte</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
        sx={{width: "220px"}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {listTypes?.map((type, index) => (
          <>
            <MenuItem key={index}>{type.descricaoEspecifica}</MenuItem>
          </>
        ))}
      </Select>
    </FormControl>
  );
}