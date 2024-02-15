export interface Usuario {
    id: number;
    nome: string;
    tipo: Tipo;
}

enum Tipo {
    Gestor = "G",
    Afiliado = "A",
    Comum = "C"
}