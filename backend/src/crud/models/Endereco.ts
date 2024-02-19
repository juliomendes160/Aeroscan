export class Endereco {
    cep: number;
    logradouro: string;
    complemento: string; 
    numero: number; 
    bairro: string;
    cidade: string; 
    estado: string; 

    constructor(cep: number, logradouro: string, complemento: string, numero: number, bairro: string, cidade: string, estado: string) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }
}