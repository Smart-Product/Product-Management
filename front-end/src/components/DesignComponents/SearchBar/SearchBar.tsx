import { Button } from '@mui/material';
import { Input } from './SearchBar.styles'
import React, { useState } from "react";
import { IProduct } from '../../../interface/IProduct';
import { getProductsFilter } from '../../../services/ProductServices';
import { useNavigate } from 'react-router-dom';

interface searchProps {
  search: (value: IProduct[]) => void
}
const SearchBar = ({ search }: searchProps) => {
  const [produto, setProduct] = useState<IProduct>();
  const token: string | null = localStorage.getItem("token")
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
      if(error.message == "Network Error") {
        localStorage.clear()
        navigate("/login")
      }
    }
  }

  return (<>
    <Input
      placeholder='Pesquise aqui ...'
      type='text'
      name='nome'
      value={produto?.nome}
      onChange={handleNomeChange}
    />
    <Button onClick={handleSearch}>Pesquisar</Button>
  </>
  )
}

export default SearchBar