export class Usuario{
    id?: number;
    nome: string;
    tipo: Tipo;

    constructor(id: number, nome: string, tipo: Tipo) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
    }
}

enum Tipo {
    Gestor = "Gestor",
    Afiliado = "Afiliado",
    Comum = "Comum"
}