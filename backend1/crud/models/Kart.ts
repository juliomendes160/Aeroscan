interface Kart {
    id: number; 
    nome: string; 
    marca: string;
    modelo: string;
    potencia: number;
    pneus: string;
    status: Status;
    alocadoPistaId: number | null; 
}

enum Status {
    Locado = "L",
    Manutencao = "M",
    Disponivel = "D"
}