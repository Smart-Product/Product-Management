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

export async function postProducts(product: IProduct) {
  if(product.tipoCorteCarne?.caracteristicaId !== 0){
    
  }
  try {
    await axios.post(`${urlApi}/produtos`, {
      dataValidade: product.dataValidade,
      descricao: product.descricao,
      nome: product.nome,
      pesoPecaKg: product.pesoPecaKg,
      precoKg: product.precoKg,
      quantidadePeca: product.quantidadePeca,
      tipoCorteCarne: product.tipoCorteCarne
    });
  } catch (error) {
    console.error(error);
    console.log(product)
    throw error;
  }
}

export async function getMeatTypes(): Promise<IMeatTypes[]>{
  try {
    const response = await axios.get(`${urlApi}/caracteristica`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getSliceTypes(meatType: string | null){
  try {
    const response = await axios.get(`${urlApi}/caracteristica/descricao/${meatType}`);
    return response.data; 

  } catch (error) {
    console.error(error);
    throw error;
  }
}
