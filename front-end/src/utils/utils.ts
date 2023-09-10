import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function formError(label: string) {
    const notify = () => toast.error(label)
    return notify;
}

export const ProductCreateSuccess = () => toast.success("Seu produto foi cadastrado !")
export const LoginSuccess = () => toast.success("Fazendo o seu Login !")
export const CreateAccountSucces = () => toast.success("Sua conta está sendo criada")

