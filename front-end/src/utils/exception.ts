import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ErrorException = (errors: any) => {
  if (errors.response.status && errors.response.data) { 
    const status = errors.response.status;
    let message = errors.response.data.message;
    if (typeof message === 'string') {
      validMessage(status, message)  
    } else {
      message.forEach((msg: string) => {
        validMessage(status, msg)         
      });
    }
  }else{
-      toast.error("Falha interna no sistema, contate a equipe de suporte!")
  }
}

const validMessage = (status: number, msg: string) => {
  if (status.toString().charAt(0) == '2') 
  toast.success(msg);
else if(status.toString().charAt(0) == '3')
  toast.warn(msg);
else if(status.toString().charAt(0) == '4') 
  toast.info(msg);            
else if(status.toString().charAt(0) == '5') 
  toast.error(msg); 
}