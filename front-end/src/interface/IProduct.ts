export interface IProduct {
    produtoId?: number;
    nome: string;
    tipoCorteCarne: string;
    tipoCarne: string;
    descricao: string;
    pesoPecaKg: number;
    quantidadePeca: number;
    precoKg: number;
    dataValidade: string;
}