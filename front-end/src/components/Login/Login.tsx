import { useState } from "react";
import { IUserLogin } from "../../interface/IUserLogin";
import { ICredentials } from "../../interface/ICredentials";
import { Link, useNavigate } from "react-router-dom";
import { autenticar } from "../../services/UserServices";
import { Box, TextField, Button, Typography } from "@mui/material";
import { UserFormContainer } from "../FormComponents/UserForms/UserForms.styles";
import { formatCPF } from "../FormComponents/UserForms/CpfFormat";
import { useCookie } from "../../hooks/useCookies";


const Login = () => {
  const [credential, setCredential] = useState<ICredentials>();
  const navigate = useNavigate();
  const [clear, setClear] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const regex = /[a-zA-Z]/;

    let formattedCpf: string | number = value;
    let contemLetra = regex.test(value);

    if (name == "login" && !contemLetra) {
      formattedCpf = formatCPF(value);
    }
    if (value.length > 40) {
      return
    }
    setCredential({ ...credential, [name]: value })
    setCredential({ ...credential, [name]: formattedCpf })
  }

  const signInUser = async (credential: ICredentials) => {
    try {
      const response = await autenticar(credential);
      setCredential(clearForm);
      setClear(true);
      useCookie().createTokenCookie(response);
      navigate("/")
    } catch (error) {
    }
  }

  const clearForm: ICredentials = {
    login: "",
    senha: ""
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(credential!);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", gap: 8 }}>
      <Typography variant="h3" sx={{ textAlign: "center", width: "100%" }}>Smart Product</Typography>
        <UserFormContainer onSubmit={handleSubmit} className="d">
        <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>Login</Typography>
          <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
            <br />
            <TextField
              label="E-mail ou CPF"
              type="text"
              name="login"
              required
              placeholder="Digite email ou CPF..."
              value={credential?.login}
              onChange={handleInputChange}
            />
            <TextField
              label="Senha"
              type="password"
              name="senha"
              required
              placeholder="Digite email ou CPF..."
              value={credential?.senha}
              onChange={handleInputChange}
            />
            <Box sx={{display: "flex", gap: 3}}>
              <Button variant="contained" type="submit">Entrar</Button>
              <Button variant="contained" type="submit" onClick={() => navigate("/cadastro")} >Criar conta</Button>
            </Box>
          </Box>
        </UserFormContainer>
      </Box>
  );
};


export default Login;