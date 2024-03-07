import { Request, Response } from 'express';
import * as usuarioDao from '../daos/usuarioDao';
import  {Usuario, Tipo}  from '../models/Usuario';
import { ObjectId } from 'mongodb';

export const Salvar = (req: Request, res: Response) => {

    if (!req.body.nome || !req.body.tipo) {
        res.status(400).json('Operação salvar: campos obrigatórios!');
        return;
    }

    const { nome, tipo }: { nome: string, tipo: Tipo } = req.body;
    const usuario: Usuario = new Usuario(nome, tipo);
    
    usuarioDao.Salvar(usuario).then(() => {
        res.status(200).json('Sucesso: operação salvar!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação salvar!', error: error.message });
    });
};

export const Listar = (req: Request, res: Response) =>{
    usuarioDao.Listar().then(usuarios => {
        res.status(200).json(usuarios);
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação listar!', error: error.message });
    });
}

export const Consultar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação consultar: id inválido!');
        return;
    }
    const id: ObjectId = new ObjectId(req.params.id);
    usuarioDao.Consultar(id).then(usuario => {
        res.status(200).json(usuario);
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação consultar!', error: error.message });
    });
    
}

export const Atualizar = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'operação atualizar: id inválido!' });
        return;
    }

    if (!req.body.nome || !req.body.tipo) {
        res.status(400).json({ message: 'Operação atualizar: campos obrigatórios!' });
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);
    const { nome, tipo }: { nome: string; tipo: Tipo } = req.body;
    const usuario: Usuario = new Usuario(nome, tipo);
        
    usuarioDao.Atualizar(id, usuario).then(() => {
        res.status(200).json('Sucesso: operação atualizar!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação atualizar!', error: error.message });
    });
}

export const Excluir = (req: Request, res: Response) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Operação excluir: id inválido!');
        return;
    }

    const id: ObjectId = new ObjectId (req.params.id);

    usuarioDao.Excluir(id).then(() => {
        res.status(200).json('Sucesso operação excluir!');
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro operação excluir!', error: error.message });
    });
}

