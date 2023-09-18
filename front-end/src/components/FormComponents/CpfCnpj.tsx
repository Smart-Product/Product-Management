import TextField from '@mui/material/TextField/TextField'
import React from 'react'

const CpfCnpj = () => {
  return (<>
    
    <TextField
          id="outlined-number"
          label="CPF ou CNPJ"
          type="text"
        />
  </>
  )
}

export default CpfCnpj