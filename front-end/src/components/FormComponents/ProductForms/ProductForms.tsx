import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../interface/IProduct";
import { postProducts } from "../../../services/ProductServices";
import { ProductFormContainer } from "./ProductForms.styles";

type WithoutProductId = Omit<IProduct, "produtoId">;

const ProductForms = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  console.log(product);

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
          <Box
            sx={{textAlign: "center", width: "98%" }}
          >
            <h1>Adicione um produto novo !</h1>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center' }}>
            <IconButton >
              <CloseIcon onClick={() => navigate("/")} />
            </IconButton>
          </Box>
        </Box>

        <ProductFormContainer onSubmit={handleSubmit}>
          <TextField
            label="Nome do produto"
            name="nome"
            required
            placeholder="Nome..."
            value={product?.nome}
            onChange={handleInputChange}
          />

          {/* <MultiSelect /> */}

          <TextField
            type="number"
            name="tipoCorteCarne"
            label="Corte"
            required
            value={product?.tipoCorteCarne}
            onChange={handleInputChange}
          />
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
          <TextField label="Data de validade" />
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
