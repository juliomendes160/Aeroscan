export class Usuario{
    nome: string;
    tipo: Tipo;

    constructor(nome: string, tipo: Tipo) {
        this.nome = nome;
        this.tipo = tipo;
    }
}

export enum Tipo {
    Gestor = "Gestor",
    Afiliado = "Afiliado",
    Comum = "Comum"
}