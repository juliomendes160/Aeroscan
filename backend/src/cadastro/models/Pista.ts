import { Endereco } from "./Endereco";

export class Pista {
    nome: string;
    tamanho: number;
    boxes: number; 
    lugares: number; 
    endereco: Endereco; 

    constructor(nome: string, tamanho: number, boxes: number, lugares: number, endereco: Endereco) {
        this.nome = nome;
        this.tamanho = tamanho;
        this.boxes = boxes;
        this.lugares = lugares;
        this.nome = nome;
        this.endereco = endereco;
    }
}