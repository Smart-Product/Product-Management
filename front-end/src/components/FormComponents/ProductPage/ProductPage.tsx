import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMeatTypes } from "../../../interface/IMeatTypes";
import { IProduct } from "../../../interface/IProduct";
import { ISliceTypes } from "../../../interface/ISliceTypes";
import {
  PutProduct,
  getMeatTypes,
  getProductsId,
  getSliceTypes,
  postProducts,
} from "../../../services/ProductServices";
import { ProductFormContainer } from "./ProductForms.styles";
import { ProductCreateSuccess, ProductEditedSuccess, formError } from "../../../utils/utils";
import { PageLayout } from "../../PersistentDrawerLeft/PageLayout";
import { useParams } from 'react-router-dom';


interface SelectProps {
  label: string;
  typesList?: IMeatTypes[] | null;
  handleMeat?: (value: string | null) => void;
  handleSlice?: (value: number) => void;
  clear?: boolean;
  descricao: string | null;
  caracteristicaId: number | null;
}

function MultiSelect({ typesList, label, handleMeat, handleSlice, clear, descricao, caracteristicaId }: SelectProps) {
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
    console.log('select: ' + meatType);
    handleMeat ? handleMeat(meatType) : null
  }, [meatType]);

  useEffect(() => {
    if (clear) {
      setMeatType(null);
      setSliceType(null);
      return;
    }
  }, [clear])

  useEffect(() => {
    if (descricao) {
      setMeatType(descricao)
    } else {
      setSliceType(caracteristicaId?.toString())
    }
  }, [descricao, caracteristicaId])

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
        value={value || ''}
        onChange={handleInputChange}
      />
    )}
  </>)
}


const ProductPage = () => {
  let { id } = useParams();

  const [product, setProduct] = useState<IProduct>();

  const [listMeatTypes, setListMeatTypes] = useState<IMeatTypes[]>([]);

  const [listSliceTypes, setListSliceTypes] = useState<ISliceTypes[]>(
    []
  );
  const [titlePageLayout, setTitlePageLayout] = useState("")

  console.log(product)

  const navigate = useNavigate();

  const [clear, setClear] = useState(false)

  const [isNegativeNumber, setisNegativeNumber] = useState(false);



  useMemo(() => {
    const fetchTypes = async () => {
      const dataTypes = await getMeatTypes();
      console.log(dataTypes)
      setListMeatTypes(dataTypes)
    };

    if (id) {
      const getProductById = async (id: number) => {
        const request = await getProductsId(id)
        return setProduct(request);
      }
      const data = getProductById(parseInt(id))
      setProduct(data)
      setTitlePageLayout("Editar Produto")
      fetchTypes();
    } else {
      fetchTypes();
      setTitlePageLayout("Adicionar Produto")
    }


  }, []);

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
        console.log("caiu no erro")
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
      console.error("erro");
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

  const editProduct = async (product: IProduct) => {
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
        const response = await PutProduct(product);
        ProductEditedSuccess()
        return response;
      } else {
        console.log("caiu no erro")
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
      console.error("erro");
    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      editProduct(product)
      return
    } else if (product?.tipoCorteCarne?.caracteristicaId == 0) {
      formError("Insira o tipo de carne")
      return
    } else {
      createProduct(product!)
      setClear(true)
    }
  };

  return (<>
    <PageLayout title={titlePageLayout}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minWidth: "80%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "94vw",
            justifyContent: "flex-end",
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
            value={product?.nome || ''}
            onChange={handleInputChange}
          />

          {listMeatTypes?.length > 0 ? (
            <MultiSelect
              typesList={listMeatTypes}
              label="Tipos de Carne"
              handleMeat={handleTypeMeat}
              clear={clear}
              descricao={id ? product?.tipoCorteCarne?.descricao : ""}
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
              caracteristicaId={id ? product?.tipoCorteCarne?.caracteristicaId : ""}

            />
          ) : (
            <TextField label="Escolha um tipo de Carne" disabled />
          )}

          <NumericInput name={"pesoPecaKg"} label={"Peso em kg"} value={product?.pesoPecaKg!} handleInput={handleInputChange} />

          <NumericInput name={"quantidadePeca"} label={"Quantidade"} value={product?.quantidadePeca} handleInput={handleInputChange} />

          <NumericInput name={"precoKg"} label={"Preço por kilo"} value={product?.precoKg} handleInput={handleInputChange} />

          <TextField
            label="Data de validade"
            type="date"
            name="dataValidade"
            required
            value={product?.dataValidade || ''}
            onChange={handleInputChange}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: "100%" }}>
            <textarea
              name="descricao"
              id="descricao"
              placeholder="Descrição..."
              onInput={() => autoResize("descricao")}
              value={product?.descricao || ''}
              onChange={handleInputChange}
            />

            <Button variant="contained" type="submit" startIcon={<AddIcon />}>
              {id ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </ProductFormContainer>
      </Box>
    </PageLayout>
  </>

  );
};

export default ProductPage;
