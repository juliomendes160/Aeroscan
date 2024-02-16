import { Request, Response } from 'express';
import * as usuarioDao from '../dao/usuarioDao';
import  {Usuario}  from '../models/Usuario';
import { ObjectId } from 'mongodb';

export const Salvar = (req: Request, res: Response) => {
    const usuario: Usuario = req.body;
    usuarioDao.Salvar(usuario).then((usuario) => {
        res.status(200).json({ message: 'Sucesso: em salvar usuário!' });
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: em salvar usuário!', error: error.message });
    });
};

export const Listar = (req: Request, res: Response) =>{
    usuarioDao.Listar().then(usuarios => {
        if (usuarios) {
            res.status(200).json(usuarios);
        } else {
            res.status(404).json({ message: 'Não existe usuários!' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro em listar usuários', error: error.message });
    });
}

export const Consultar = (req: Request, res: Response) => {
    const id: ObjectId = new ObjectId (req.params.id);
    
    usuarioDao.Consultar(id).then(usuario => {
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Não existe usuário!' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro ao consultar usuário', error: error.message });
    });
}

export const Atualizar = (req: Request, res: Response) => {
    const id: ObjectId = new ObjectId (req.params.id);
    const usuario: Usuario = req.body;

    usuarioDao.Atualizar(id, usuario).then((usuario) => {
        res.status(200).json({ message: 'Sucesso: em atualizar usuário!' });
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: em atualizar usuário!', error: error.message });
    });
}

export const Excluir = (req: Request, res: Response) => {
    const id: ObjectId = new ObjectId (req.params.id);
    
    usuarioDao.Excluir(id).then(usuario => {
        res.status(200).json({ message: 'Sucesso: em excluir usuário!' });
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: em excluir usuário!', error: error.message });
    });
   
}


