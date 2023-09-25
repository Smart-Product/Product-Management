import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMeatTypes } from "../../../interface/IMeatTypes";
import { IProduct } from "../../../interface/IProduct";
import { ISliceTypes } from "../../../interface/ISliceTypes";
import {
  getMeatTypes,
  getSliceTypes,
  postProducts,
} from "../../../services/ProductServices";
import { ProductFormContainer } from "./ProductForms.styles";
import { ProductCreateSuccess, formError } from "../../../utils/utils";


interface SelectProps {
  label: string;
  typesList?: IMeatTypes[] | null;
  handleMeat?: (value: string | null) => void;
  handleSlice?: (value: number) => void;
  clear?: boolean;
}

function MultiSelect({ typesList, label, handleMeat, handleSlice, clear }: SelectProps) {
  const [meatType, setMeatType] = useState<string | null>(null);
  const [sliceType, setSliceType] = useState<string | null>(null);

  const isMeatType = label == "Tipos de Carne" ? true : false;

  const handleChange = (event: SelectChangeEvent) => {
    if (label == "Tipos de Carne") {
      const selectedValue = event.target.value;
      setMeatType(selectedValue)
      return;
    } else {
      const selectedValue = event.target.value;
      setSliceType(selectedValue)

      handleSlice ? handleSlice(parseInt(selectedValue)) : null
    }
  };

  useEffect(() => {
    handleMeat ? handleMeat(meatType) : null
  }, [meatType]);

  useEffect(() => {
    if (clear) {
      setMeatType(null);
      setSliceType(null);
      return;
    }
  }, [clear])

  return (
    <FormControl size="medium">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={meatType ?? sliceType ?? ""}
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


interface NumericInputProps {
  name: string;
  label: string;
  value: number | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function NumericInput({ name, label, value, handleInput }: NumericInputProps) {

  const [isNegative, setIsNegative] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (e.target.type === "number") {
      let numericValue: number = parseFloat(value);
      if (numericValue < 0) {
        setIsNegative(true)
        return handleInput(e)
      } else {
        setIsNegative(false)
        return handleInput(e)
      }
    } else {
      handleInput(e)
    }


  };

  return (<>
    {isNegative ? (
      <TextField
        type="number"
        error
        name={name}
        required
        helperText="Insira um valor positivo."
        value={value}
        onChange={handleInputChange}
      />
    ) : (
      <TextField
        type="number"
        name={name}
        label={label}
        required
        value={value}
        onChange={handleInputChange}
      />
    )}
  </>)
}


const ProductForms = () => {
  const [product, setProduct] = useState<IProduct>();
  const [listMeatTypes, setListMeatTypes] = useState<IMeatTypes[]>([]);
  const [listSliceTypes, setListSliceTypes] = useState<ISliceTypes[]>(
    []
  );
  const navigate = useNavigate();
  const [clear, setClear] = useState(false)
  const [isNegativeNumber, setisNegativeNumber] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target.type === "number") {
      let numericValue: number = parseFloat(value);
      if (numericValue < 0) {
        setisNegativeNumber(true)
        return setProduct({ ...product, [name]: undefined })
      } else {
        setisNegativeNumber(false)
        return setProduct({ ...product, [name]: numericValue });
      }
    } else {
      let textValue: string = value;

      return setProduct({ ...product, [name]: textValue });
    }


  };

  useMemo(() => {
    const fetchTypes = async () => {
      const dataTypes = await getMeatTypes();
      console.log(dataTypes)
      setListMeatTypes(dataTypes)
    };

    fetchTypes();
  }, []);

  const fetchTypeSlices = async (meatType: string | null) => {
    const dataSlices: ISliceTypes[] = await getSliceTypes(meatType);
    console.log('cortes: ', dataSlices)
    setListSliceTypes(dataSlices);

  };

  const handleTypeMeat = async (meatType: string | null) => {

    await fetchTypeSlices(meatType);

  };

  const handleTypeSlice = (sliceType: number) => {

    setProduct({ ...product, tipoCorteCarne: { caracteristicaId: sliceType } })

    //todo: inserir este tipo de corte no formulario
  };

  const createProduct = async (product: IProduct) => {
    let date: string = product.dataValidade ?? ""
    let dateString = new Date(Date.parse(date))

    try {
      if (dateString < new Date()) {
        formError("O produto está vencido!");
        return;
      }
      else if (
        product.nome &&
        product.descricao &&
        product.precoKg &&
        product.pesoPecaKg &&
        product.quantidadePeca &&
        product.tipoCorteCarne
      ) {
        const response = await postProducts(product);
        ProductCreateSuccess();
        const clearForm: IProduct = {
          produtoId: 0,
          nome: "",
          descricao: "",
          pesoPecaKg: 0,
          quantidadePeca: 0,
          precoKg: 0,
          dataValidade: "",
          tipoCorteCarne: { caracteristicaId: 0 }
        };

        setProduct(clearForm)
        return response;
      } else {
        if (typeof (product.nome) !== "string") {
          return formError("Insira um nome");
        }
        if (typeof (product.descricao) !== "string") {
          formError("Insira uma descrição");
        }
        if (typeof (product.precoKg) !== "number") {
          formError("O preço deve ser positivo");
        }
        if (typeof (product.pesoPecaKg) !== "number") {
          formError("O peso deve ser positivo");
        }
        if (typeof (product.quantidadePeca) !== "number") {
          formError("A quantidade deve ser positiva");
        }
        if (typeof (product.tipoCorteCarne?.caracteristicaId) !== "number") {
          formError("Escolha um tipo de corte");
        }
      }

    } catch {
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

    if (product?.tipoCorteCarne?.caracteristicaId == 0) {
      formError("Insira o tipo de carne")
      return
    } else {
      createProduct(product!)
      setClear(true)
    }
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

          {listMeatTypes?.length > 0 ? (
            <MultiSelect
              typesList={listMeatTypes}
              label="Tipos de Carne"
              handleMeat={handleTypeMeat}
              clear={clear}
            />
          ) : (
            <TextField label="Tipos de Carne" disabled />
          )}


          {listSliceTypes?.length > 0 ? (
            <MultiSelect
              typesList={listSliceTypes}
              label="Tipos de Corte"
              handleSlice={handleTypeSlice}
              clear={clear}

            />
          ) : (
            <TextField label="Escolha um tipo de Carne" disabled />
          )}

          <NumericInput name={"pesoPecaKg"} label={"Peso em kg"} value={product?.pesoPecaKg} handleInput={handleInputChange} />

          <NumericInput name={"quantidadePeca"} label={"Quantidade"} value={product?.quantidadePeca} handleInput={handleInputChange} />

          <NumericInput name={"precoKg"} label={"Preço por kilo"} value={product?.precoKg} handleInput={handleInputChange} />

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
