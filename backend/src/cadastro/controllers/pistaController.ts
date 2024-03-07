import { Request, Response } from 'express';
import { Pista } from './../models/Pista';
import { Endereco } from './../models/Endereco';
import { ObjectId } from 'mongodb';
import * as pistaDao from '../daos/pistaDao';


export const Salvar = (req: Request, res: Response) => {

    if (!req.body.nome || !req.body.tamanho || !req.body.boxes || !req.body.lugares) {
        res.status(400).json({ message: 'Operação salvar: campos obrigatórios pista!' });
        return;
    }

    if (!req.body.cep || !req.body.logradouro || !req.body.complemento || !req.body.numero || !req.body.bairro || !req.body.cidade || !req.body.estado) {
        res.status(400).json({ message: 'Operação salvar: campos obrigatórios endereço!' });
        return;
    }

    const {cep, logradouro, complemento, numero, bairro, cidade, estado}: { cep: number, logradouro: string, complemento: string, numero: number, bairro:string, cidade:string, estado: string} = req.body;
    const endereco: Endereco = new Endereco(cep, logradouro, complemento, numero, bairro, cidade, estado);

    const { nome, tamanho, boxes, lugares }: { nome: string, tamanho: number, boxes: number, lugares: number} = req.body;
    const pista: Pista = new Pista(nome, tamanho, boxes, lugares, endereco);
    
    pistaDao.Salvar(pista).then((pista) => {
        res.status(200).json('Operação salvar: sucesso!');
    })
    .catch(error => {
        res.status(500).json('Operação salvar: erro!');
    });
};

export const Listar = (req: Request, res: Response) =>{
    pistaDao.Listar().then(pistas => {
        res.status(200).json(pistas);
    })
    .catch(error => {
        res.status(500).json('Operação listar: erro!');
    });
}

export const Consultar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação consultar: campo inválido id!');
        return;
    }

    const id: ObjectId = new ObjectId(req.params.id);

    pistaDao.Consultar(id).then(pista => {
        res.status(200).json(pista);
    })
    .catch(error => {
        res.status(500).json('Operação consultar: erro!');
    });
    
}

export const Atualizar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação atualizar:campo inválido id!');
        return;
    }

    if (!req.body.nome || !req.body.tamanho || !req.body.boxes || !req.body.lugares) {
        res.status(400).json('Operação atualizar: campos obrigatórios pista!');
        return;
    }

    if (!req.body.cep || !req.body.logradouro || !req.body.complemento || !req.body.numero || !req.body.bairro || !req.body.cidade || !req.body.estado) {
        res.status(400).json({ message: 'Operação salvar: campos obrigatórios endereço!' });
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);
  
    const {cep, logradouro, complemento, numero, bairro, cidade, estado}: { cep: number, logradouro: string, complemento: string, numero: number, bairro:string, cidade:string, estado: string} = req.body;
    const endereco: Endereco = new Endereco(cep, logradouro, complemento, numero, bairro, cidade, estado);

    const { nome, tamanho, boxes, lugares }: { nome: string, tamanho: number, boxes: number, lugares: number} = req.body;
    const pista: Pista = new Pista(nome, tamanho, boxes, lugares, endereco);
        
    pistaDao.Atualizar(id, pista).then((pista) => {
        res.status(200).json('Operação atualizar: sucesso!');
    })
    .catch(error => {
        res.status(500).json('Operação atualizar: erro!');
    });
}

export const Excluir = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação excluir: id inválido!');
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);

    pistaDao.Excluir(id).then(pista => {
        res.status(200).json('Operação excluir: sucesso!');
    })
    .catch(error => {
        res.status(500).json('Operação excluir: erro!');
    });
}

