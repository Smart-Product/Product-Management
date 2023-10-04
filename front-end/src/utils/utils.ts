import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import  ptBR  from 'date-fns/locale/pt-BR';
import 'react-toastify/dist/ReactToastify.css';

export const formatDate = (date?: Date | string) => {
  let dateToFormat: string | Date | undefined = date;
  if (!dateToFormat) return undefined;

  if (typeof dateToFormat === 'string') {
    dateToFormat = parseISO(dateToFormat);
    
  }
  return format(dateToFormat, 'dd  / MMM / yyyy', {locale: ptBR});
};

export const formError = (label: string) => toast.error(label)
export const ProductCreateSuccess = () => toast.success("Seu produto foi cadastrado !")
export const LoginSuccess = () => toast.success("Login Realizado !")
export const ProductEditedSuccess = () => toast.success("O produto foi editado ✍️ !")
export const ProductDeletedSuccess = () => toast.success("O produto foi Deletado 🗑️ !")
export const CreateAccountSucces = () => toast.success("Sua conta foi criada !")
export const CreateUserSuccess = () => toast.success("Seu usuário está sendo criado")
export const ErrorException = (errors: any) => {
    for (let i in errors) {
        toast.warn(errors[i]);
      }
}



