import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ErrorException = (errors: any) => {
  if (errors.message == "Network Error") {
    toast.info("TOKEN expirado!"); 
  }else {
    const status = errors.response.status;
    if (status.toString().charAt(0) != '5') {
      errors.response.data.messageErrors.forEach((msg: string) => {
        if (status.toString().charAt(0) == '2') 
          toast.success(msg);
        else if(status.toString().charAt(0) == '3')
          toast.warn(msg);
        else if(status.toString().charAt(0) == '4') 
          toast.info(msg);            
      });
    }else{
      toast.error("Falha no sistema, contate a equipe de suporte!")
    }
  }


  }