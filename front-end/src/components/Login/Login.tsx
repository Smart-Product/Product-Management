import { useState } from "react";
import { IUserLogin } from "../../interface/IUserLogin";
import { ICredentials } from "../../interface/ICredentials";
import { Link, useNavigate } from "react-router-dom";
import { autenticar } from "../../services/UserServices";
import { Box, TextField, Button } from "@mui/material";
import { UserFormContainer } from "../FormComponents/UserForms/UserForms.styles";
import { formatCPF } from "../FormComponents/UserForms/CpfFormat";


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
      insertLocalStorage(response);
      navigate("/")
    } catch (error) {
    }
  }
  
  const insertLocalStorage =(response: IUserLogin) => {
    localStorage.setItem("login", response.login);
    localStorage.setItem("token", response.token);
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
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100vw", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "center", width: "100%" }}><h1>Login</h1></Box>
        </Box>
        <UserFormContainer onSubmit={handleSubmit} className="d">
            <Box sx={{ flexDirection: "column", width: "300px" }}>
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
              <br />
              <br />
              <TextField
                label="Senha"
                type="password"  
                name="senha"
                required
                placeholder="Digite email ou CPF..."
                value={credential?.senha}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <Button variant="contained" type="submit">Logar</Button>
              <br />
              <p>Precisa de uma conta ? Crie <Link to={"/cadastro"}>Aqui</Link></p>
            </Box>
          </UserFormContainer>
      </Box>
    </>
  );
};


export default Login;