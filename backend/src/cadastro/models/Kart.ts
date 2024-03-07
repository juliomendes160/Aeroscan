export  class Kart {
    nome: string; 
    marca: string;
    modelo: string;
    potencia: number;
    pneus: string;
    status: Status;

    constructor(nome: string, marca: string, modelo: string, potencia:number, pneus: string, status: Status){
        this.nome = nome; 
        this.marca = marca; 
        this.modelo = modelo; 
        this.potencia = potencia; 
        this.pneus = pneus; 
        this.status = status;
    }
}

export enum Status {
    Locado = "Locado",
    Manutencao = "Manutenção",
    Disponivel = "Disponível"
}