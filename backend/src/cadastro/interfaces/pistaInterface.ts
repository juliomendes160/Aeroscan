import { Endereco } from './../interfaces/enderecoInterface';
export interface Pista{
    _id?: string;
    nome: string
    tamanho: number;
    boxes: number;
    lugares: number;
    endereco: Endereco;
}
