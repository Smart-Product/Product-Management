import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function formError(label: string) {
    const notify = () => toast.error(label)
    return notify;
}

export const ProductCreateSuccess = () => toast.success("Seu produto foi cadastrado !")
export const LoginSuccess = () => toast.success("Fazendo o seu Login !")
export const CreateAccountSucces = () => toast.success("Sua conta está sendo criada")
export const CreateUserSuccess = () => toast.success("Seu usuário está sendo criada")
export const ErrorException = (errors: any) => {
    for (let i in errors) {
        toast.warn(errors[i]);
      }
}

