import axios from "axios";
import { IProduct } from "../interface/IProduct";
import { IMeatTypes } from "../interface/IMeatTypes";
import { ErrorException } from "../utils/exception";

const urlApi = "http://localhost:8000/api";

export async function getProducts(token: string | null): Promise<IProduct[]> {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = (await axios.get(`${urlApi}/produtos`, config));
    return response.data;
  } catch (error) {
    ErrorException(error);
    throw error
  }
}

export async function getProductsFilter(token: string | null, product: IProduct | undefined): Promise<IProduct[]> {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        dataValidade: product?.dataValidade,
        descricao: product?.descricao,
        nome: product?.nome,
        pesoPecaKg: product?.pesoPecaKg,
        precoKg: product?.precoKg,
        quantidadePeca: product?.quantidadePeca
      }
    };
    const response = await axios.get(`${urlApi}/produtos`, config);
    return response.data;
  } catch (error) {
    ErrorException(error);
    throw error
  }
}

export async function postProducts(token: string | null, product: IProduct) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
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
    }, config);
  } catch (error) {
    ErrorException(error);
    throw error
  }
}

export async function getMeatTypes(): Promise<IMeatTypes[]>{
  try {
    const response = await axios.get(`${urlApi}/caracteristica`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getSliceTypes(meatType: string | null){
  try {
    const response = await axios.get(`${urlApi}/caracteristica/descricao/${meatType}`);
    return response.data; 

  } catch (error) {
     throw ErrorException(error);
  }
}
