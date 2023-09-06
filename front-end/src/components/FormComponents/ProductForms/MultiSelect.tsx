import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { IMeatTypes } from "../../../interface/IMeatTypes";

interface SelectProps {
  label: string;
  meatTypes: IMeatTypes[] | null;
  handleValue: (value: string | undefined) => void;
}

export function MultiSelect({ meatTypes, label, handleValue }: SelectProps) {
  const [meatType, setMeatType] = useState<string | undefined>(undefined);

  const handleChange = (event: SelectChangeEvent) => {
    setMeatType(event.target.value);
  };

  useEffect(() => {

    handleValue(meatType);

  }, [meatType]);
  
  return (
    <FormControl size="medium">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={meatType}
        label="Tipo de Carne"
        onChange={handleChange}
        sx={{ width: "220px" }}
      >
        {meatTypes?.map((type, index) => (
          <MenuItem key={index} value={type.value}>{type.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
