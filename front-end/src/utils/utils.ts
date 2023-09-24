import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const formError = (label: string) => toast.error(label)
export const ProductCreateSuccess = () => toast.success("Seu produto foi cadastrado ➕!")
export const ProductEditedSuccess = () => toast.success("Produto Editado com sucesso ✍️!")
export const ProductDeletedSuccess = () => toast.success("Produto Deletado com sucesso 🗑️!")
export const LoginSuccess = () => toast.success("Fazendo o seu Login !")
export const CreateAccountSucces = () => toast.success("Sua conta está sendo criada")
export const CreateUserSuccess = () => toast.success("Seu usuário está sendo criado")
export const ErrorException = (errors: any) => {
  for (let i in errors) {
    toast.warn(errors[i]);
  }
}

