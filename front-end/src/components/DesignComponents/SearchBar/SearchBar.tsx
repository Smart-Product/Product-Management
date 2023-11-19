import { Box, Button, Divider, Fab, TextField } from '@mui/material';
import { Input } from './SearchBar.styles'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import { IProduct } from '../../../interface/IProduct';
import { getProductsFilter } from '../../../services/ProductServices';
import { useNavigate } from 'react-router-dom';
import { useCookie } from '../../../hooks/useCookies';

interface searchProps {
  search: (value: IProduct[]) => void
}
const SearchBar = ({ search }: searchProps) => {
  const [produto, setProduct] = useState<IProduct>();
  const token = useCookie().getAuthCookie().token;
  const navigate = useNavigate();

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await getProductsFilter(token, produto)
      return search(response);
    } catch (error: any) {
      if (error.response.data.message == "Token Inválido." || error.response.data.message == "Token expirado!") {
        localStorage.clear()
        navigate("/login")
      }
    }
  }

  return (
    <Box sx={{display: "flex", width: "100%"}}>
       <TextField
              label="Pesquisar"
              type="text"
              name="nome"
              required
              placeholder="Digite o nome do produto"
              value={produto?.nome}
              onChange={handleNomeChange}
              fullWidth
              size="small"
              sx={{mr: 2}}
            />

      <Fab size="small" color="primary" onClick={handleSearch} >
        <SearchIcon/>
      </Fab>

      <Divider orientation="vertical" sx={{ml: 2}}/>
    </Box>

  )
}

export default SearchBar