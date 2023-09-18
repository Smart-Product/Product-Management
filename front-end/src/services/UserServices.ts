import axios from "axios";
import { IUser } from "../interface/IUser";
import { CreateUserSuccess, ErrorException } from "../utils/utils";

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
    } catch (error:any) {
      throw ErrorException(error.response.data.messageErrors);
    }
  }