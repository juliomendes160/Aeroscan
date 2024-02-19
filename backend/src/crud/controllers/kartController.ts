import { Request, Response } from 'express';
import * as kartDao from '../dao/kartDao';
import  {Kart, Status}  from '../models/Kart';
import { ObjectId } from 'mongodb';

export const Salvar = (req: Request, res: Response) => {

    if (!req.body.nome || !req.body.marca || !req.body.modelo || !req.body.potencia || !req.body.pneus || !req.body.status) {
        res.status(400).json('Operação salvar: campos obrigatórios kart!');
        return;
    }

    const { nome, marca, modelo, potencia, pneus, status }: { nome: string, marca: string, modelo: string, potencia:number, pneus: string, status: Status} = req.body;
    const kart: Kart = new Kart(nome, marca, modelo, potencia, pneus, status);
    
    kartDao.Salvar(kart).then(() => {
        res.status(200).json('Sucesso na operação salvar!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro na operação salvar!', error: error.message });
    });
};

export const Listar = (req: Request, res: Response) =>{
    kartDao.Listar().then(karts => {
        res.status(200).json(karts);
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro operação listar!', error: error.message });
    });
}

export const Consultar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação consultar: id inválido!');
        return;
    }
    const id: ObjectId = new ObjectId(req.params.id);
    kartDao.Consultar(id).then(kart => {
        res.status(200).json(kart);
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro na operação consultar!', error: error.message });
    });
    
}

export const Atualizar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'operação atualizar: id inválido!' });
        return;
    }

    if (!req.body.nome || !req.body.marca || !req.body.modelo || !req.body.potencia || !req.body.pneus || !req.body.status) {
        res.status(400).json('Operação salvar: campos obrigatórios kart!');
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);

    const { nome, marca, modelo, potencia, pneus, status }: { nome: string, marca: string, modelo: string, potencia:number, pneus: string, status: Status} = req.body;
    const kart: Kart = new Kart(nome, marca, modelo, potencia, pneus, status);
        
    kartDao.Atualizar(id, kart).then(() => {
        res.status(200).json('Sucesso operação atualizar!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro operação atualizar!', error: error.message });
    });
}

export const Excluir = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação excluir: id inválido!');
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);

    kartDao.Excluir(id).then(() => {
        res.status(200).json('Sucesso operação excluir!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro operação excluir!', error: error.message });
    });
}