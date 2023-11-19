import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../interface/IUser";
import {
  postUsers,
} from "../../../services/UserServices";
import { UserFormContainer } from "../UserForms/UserForms.styles";
import { formatCPF } from "./CpfFormat";

const UserForms = () => {
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();
  const [clear, setClear] = useState(false)
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>("");
  const [errorCpfMessage, setErrorNomeMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let numericValue: string | number = value;
    let formattedCpf: string | number = value;
    let valid = true;
    if (e.target.type === "number") {
      numericValue = parseInt(value);
    }
    if (name == "cpf") {
      formattedCpf = formatCPF(value);
    }
    if (name == "nome" && value.length > 40) {
      setErrorNomeMessage('Excedeu o total de caracteres');
      return;
    }
    if (name == "email" && value.length > 40) {
      setErrorEmailMessage('Excedeu o total de caracteres');
      return;
    }
    if (name == "email" && !value.includes("@")) {
      setErrorEmailMessage('Email inválido');
      valid = false;
    }
    if (valid) {
      setErrorNomeMessage('');
      setErrorEmailMessage('');
    }
    setUser({ ...user, [name]: numericValue });
    setUser({ ...user, [name]: formattedCpf });
  };

  const createUser = async (user: IUser) => {
    try {
      const response = await postUsers(user);
      setUser(clearForm)
      setClear(true);
      navigate('/login')
      return response;
    } catch (error) {
    }
  };

  const clearForm: IUser = {
    usuarioId: 0,
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(user!);
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

          <Typography variant="h4" sx={{ margin: "0 auto" }}>Criar conta</Typography>

        </Box>

        <UserFormContainer onSubmit={handleSubmit} className="d">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "30em" }}>
            <TextField
              label="Nome"
              type="text"
              name="nome"
              required
              placeholder="Nome..."
              value={user?.nome}
              onChange={handleInputChange}
            />
            <div className="error-message">{errorCpfMessage}</div>
            <TextField
              label="CPF"
              type="text"
              name="cpf"
              required
              placeholder="999.999.999-99"
              value={user?.cpf}
              onChange={handleInputChange}
            />
            <TextField
              type="text"
              name="email"
              label="E-mail"
              required
              placeholder="teste@teste.com"
              value={user?.email}
              onChange={handleInputChange}
            />
            <div className="error-message">{errorEmailMessage}</div>
            <TextField
              type="password"
              name="senha"
              label="Senha"
              value={user?.senha}
              required
              onChange={handleInputChange}
            />

            <TextField
              type="password"
              label="Confirmar Senha"
              name="confirmarSenha"
              value={user?.confirmarSenha}
              required
              onChange={handleInputChange}
            />


            <Button variant="contained" type="submit" sx={{ width: "30%", m: "0 auto" }}>
              Cadastrar
            </Button>

            <Typography variant="inherit">Já tem conta ? Faça o Login <Link to={"/login"}>aqui</Link></Typography>

          </Box>
        </UserFormContainer>
      </Box>
    </>
  );
};

export default UserForms;
