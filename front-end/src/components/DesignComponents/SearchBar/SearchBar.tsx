import { Button } from '@mui/material';
import { Input } from './SearchBar.styles'
import React, { useState } from "react";
import { IProduct } from '../../../interface/IProduct';
import { getProductsFilter } from '../../../services/ProductServices';

interface searchProps {
  search: (value: IProduct[]) => void
}
const SearchBar = ({ search }: searchProps) => {
  const [produto, setProduct] = useState<IProduct>();

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await getProductsFilter(produto)
      return search(response);
    } catch (error) {
      console.error(error)
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