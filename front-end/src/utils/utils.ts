import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const formError = (label: string) => toast.error(label)
export const ProductCreateSuccess = () => toast.success("Seu produto foi cadastrado !")
export const LoginSuccess = () => toast.success("Você está Logado !")
export const CreateAccountSucces = () => toast.success("Sua conta está sendo criada")
export const CreateUserSuccess = () => toast.success("Seu usuário está sendo criado")


