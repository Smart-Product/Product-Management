import axios from "axios";
import { IProduct } from "../interface/IProduct";
import { IMeatTypes } from "../interface/IMeatTypes";

const urlApi = "http://localhost:8000/api";

export async function getProducts(): Promise<IProduct[]> {
  try {
    const response = await axios.get(`${urlApi}/produtos`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProducts(product: IProduct | null) {
  try {
    await axios.post(`${urlApi}/produtos`, {
      nome: product?.nome,
      precoKg: product?.precoKg,
      descricao: product?.descricao,
      quantidadePeca: product?.quantidadePeca,
      pesoPecaKg: product?.pesoPecaKg,
      dataValidade: product?.dataValidade,
      tipoCorteCarne: {
        caracteristicaId: product?.tipoCorteCarne
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMeatTypes(): Promise<IMeatTypes[] | null>{
  try {
    const response = await axios.get(`${urlApi}/caracteristica`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getSliceTypes(meatType: string | undefined){
  try {
    const response = await axios.get(`${urlApi}/caracteristica/descricao/${meatType}`);
    console.log('service: ' + meatType);
    return response.data; 

  } catch (error) {
    console.error(error);
    throw error;
  }
}
