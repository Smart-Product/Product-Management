import axios from "axios";
import { IProduct } from "../interface/IProduct";

const urlProducts = "http://localhost:8000/api/produtos";

export async function getProducts(): Promise<IProduct[]> {
  try {
    const response = await axios.get(urlProducts);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProducts(product: IProduct | null) {
  try {
    await axios.post(urlProducts, {
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
