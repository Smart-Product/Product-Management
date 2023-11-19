import axios from "axios";
import { IUser } from "../interface/IUser";
import { CreateUserSuccess, LoginSuccess } from "../utils/utils";
import { ICredentials } from "../interface/ICredentials";
import { IUserLogin } from "../interface/IUserLogin";
import { ErrorException } from "../utils/exception";



const urlApi = "http://localhost:8000/api/usuarios";

export async function postUsers(user: IUser) {
  try {
    await axios.post(`${urlApi}`, {
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      senha: user.senha,
      confirmarSenha: user.confirmarSenha
    });      
    CreateUserSuccess();
  } catch (error) {
    throw ErrorException(error);
  }
}


export async function autenticar(credential: ICredentials): Promise<IUserLogin> {
  try {
    const response = await axios.post(`${urlApi}/autenticar`, {
      login: credential.login,
      senha: credential.senha
    });
    LoginSuccess();
    return response.data;
  } catch (error) {
    throw ErrorException(error)
  }
}