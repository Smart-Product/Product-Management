export interface IProduct {
  produtoId?: number;
  nome?: string;
  descricao?: string;
  pesoPecaKg?: number;
  quantidadePeca?: number;
  precoKg?: number;
  dataValidade?: string;
  tipoCorteCarne?: {
      caracteristicaId? : number;
      descricao?: string,
    descricaoEspecifica?: string
  }
}