import { Box, TextField } from "@mui/material";

const NameEmail = () => {

  
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
        <TextField id="standard-basic" label="E-mail" variant="standard" />
      </Box>
    </>
  );
};

export default NameEmail;
