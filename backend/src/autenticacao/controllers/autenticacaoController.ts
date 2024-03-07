import { Request, Response } from 'express';
import  {Autenticacao}  from '../models/Autenticacao';
import * as autenticacaoDao from '../dao/autenticacaoDao';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express-serve-static-core';

export const Register = (req: Request, res: Response) => {

    if (!req.body.usuario || !req.body.senha) {
        res.status(400).json('Operação register: campos obrigatórios autenticação!');
        return;
    }

    const {usuario, senha}: {usuario: string, senha: string} = req.body;
    const autenticacao: Autenticacao = new Autenticacao(usuario, senha);

    autenticacaoDao.Register(autenticacao).then((result) => {
        res.status(200).json('Sucesso: operação register');  
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação register!', error: error.message });
    });
}

export const Login = (req: Request, res: Response) => {

    if (!req.body.usuario || !req.body.senha) {
        res.status(400).json('Operação login: campos obrigatórios autenticação!');
        return;
    }

    const {usuario, senha}: {usuario: string, senha: string} = req.body;
    const autenticacao: Autenticacao = new Autenticacao(usuario, senha);

    autenticacaoDao.Login(autenticacao).then((result) => {
        if(!result){
            res.status(404).json('Operação login: usuário ou senha inválidos!');  
            return;
        }

        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro: operação login!', error: error.message });
    });
}

export const Validar = (req: Request, res: Response, next: NextFunction) => {
  
    if (!req.headers.authorization) {
        return res.status(404).json('Operação token: token obrigatório!');
    }

    const token = req.headers.authorization;
    
    try {
        jwt.verify(token, 'chave-secreta');
        next();
    } catch (error) {
        return res.status(400).json('Token inválido' );
    }
}