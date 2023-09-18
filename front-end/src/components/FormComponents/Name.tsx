import { Box, TextField } from "@mui/material";

const Name = () => {

  
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="Nome Completo" variant="standard" />
      </Box>
    </>
  );
};

export default Name;
