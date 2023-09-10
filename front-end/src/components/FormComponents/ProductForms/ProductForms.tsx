import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMeatTypes } from "../../../interface/IMeatTypes";
import { IProduct } from "../../../interface/IProduct";
import {
  getMeatTypes,
  getSliceTypes,
  postProducts,
} from "../../../services/ProductServices";
import { ProductFormContainer } from "./ProductForms.styles";
import { ISliceTypes } from "../../../interface/ISliceTypes";


interface SelectProps {
  label: string;
  typesList?: IMeatTypes[] | null;
  handleValue: (value: string | number | null) => void;
}

function MultiSelect({ typesList, label, handleValue }: SelectProps) {
  const [meatType, setMeatType] = useState<string | null>(null);
  const [sliceType, setSliceType] = useState<number | null>(null);

  const isMeatType = label == "Tipos de Carne" ? true : false;

  const handleChange = (event: SelectChangeEvent) => {
    if (label == "Tipos de Carne") {
      const selectedValue = event.target.value;
      setMeatType(selectedValue)
      return;
    } else {
      const selectedValue = event.target.value;
      setSliceType(parseInt(selectedValue))

      handleValue(selectedValue)
    }
  };

  useEffect(() => {
    console.log('select: ' + meatType);
    handleValue(meatType);
  }, [meatType]);

  return (
    <FormControl size="medium">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={label == "Tipos de Carne" ? meatType : sliceType}
        label="Tipo de Carne"
        onChange={handleChange}
        sx={{ width: "220px" }}
      >
        {typesList?.map((type, index) => (
          <MenuItem key={index} value={isMeatType ? type.value : type.key}>
            {type.value}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}


const ProductForms = () => {
  const [product, setProduct] = useState<IProduct>();
  const [listMeatTypes, setListMeatTypes] = useState<IMeatTypes[] | null>(null);
  const [listSliceTypes, setListSliceTypes] = useState<ISliceTypes[]>(
    []
  );
  const [meatType, setMeatType] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let numericValue: string | number = value;
  
    if (e.target.type === "number") {
      numericValue = parseInt(value);
    }
  
    setProduct({ ...product, [name]: numericValue });
  };

  console.log(product)

  useMemo(() => {
    const fetchTypes = async () => {
      const dataTypes = await getMeatTypes();
      setListMeatTypes(dataTypes)
    };

    fetchTypes();
  }, []);

  const fetchTypeSlices = async (meatType: string) => {
    const dataSlices: ISliceTypes[] = await getSliceTypes(meatType);
    setListSliceTypes(dataSlices);

  };

  const handleTypeMeat = async (meatType: string | null) => {
    setMeatType(meatType);

    console.log('form : ', meatType)

    await fetchTypeSlices(meatType);

    //inserir este tipo de carne no formulario
  };

  const handleTypeSlice = (sliceType: number) => {

    setProduct({ ...product, tipoCorteCarne: {caracteristicaId: sliceType }})

    //todo: inserir este tipo de corte no formulario
  };

  const createProduct = async (product: IProduct) => {
    try {
      const response = await postProducts(product);
      return response;
    } catch {
      console.log("error");
    }
  };

  const autoResize = (tagId: string) => {
    const textarea: HTMLElement | null = document.getElementById(`${tagId}`);
    if (textarea != null) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    } else {
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProduct(product!);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "center", width: "98%" }}>
            <h1>Adicione um produto novo !</h1>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/")}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <ProductFormContainer onSubmit={handleSubmit}>
          <TextField
            label="Nome do produto"
            type="text"
            name="nome"
            required
            placeholder="Nome..."
            value={product?.nome}
            onChange={handleInputChange}
          />

          <MultiSelect
            typesList={listMeatTypes}
            label="Tipos de Carne"
            handleValue={handleTypeMeat}

          />

          {listSliceTypes?.length > 0 ? (
            <MultiSelect
              typesList={listSliceTypes}
              label="Tipos de Corte"
              handleValue={handleTypeSlice}

            />
          ) : (
            <TextField label="Tipos de Corte" disabled />
          )}

            <TextField
              type="number"
              name="pesoPecaKg"
              label="Peso em kg"
              required
              value={product?.pesoPecaKg}
              onChange={handleInputChange}
            />
            <TextField
              type="number"
              name="quantidadePeca"
              label="Quantidade"
              required
              value={product?.quantidadePeca}
              onChange={handleInputChange}
            />
            <TextField
              type="number"
              name="precoKg"
              label="Preço por kilo"
              required
              value={product?.precoKg}
              onChange={handleInputChange}
            />
            <TextField
              label="Data de validade"
              type="date"
              name="dataValidade"
              required
              value={product?.dataValidade}
              onChange={handleInputChange}
            />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <textarea
              name="descricao"
              id="descricao"
              placeholder="Descrição..."
              onInput={() => autoResize("descricao")}
              value={product?.descricao}
              onChange={handleInputChange}
            />

            <Button variant="contained" type="submit" startIcon={<AddIcon />}>
              Adicionar
            </Button>
          </Box>
        </ProductFormContainer>
      </Box>
    </>
  );
};

export default ProductForms;
