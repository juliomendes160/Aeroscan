import { Request, Response } from 'express';
import  {Autenticacao}  from '../models/Autenticacao';
import * as autenticacaoDao from '../dao/autenticacaoDao';

export const Login = (req: Request, res: Response) => {

    if (!req.body.usuario || !req.body.senha) {
        res.status(400).json({ message: 'Operação login: campos obrigatórios autenticação!' });
        return;
    }

    const {usuario, senha}: {usuario: string, senha: string} = req.body;
    const autenticacao: Autenticacao = new Autenticacao(usuario, senha);

    autenticacaoDao.Login(autenticacao).then((database) => {
        if(database){
            res.status(200).json('Sucesso na operação login!');   
        }else{
            res.status(404).json('Operação login: usuário ou senha inválidos!');   
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Erro na operação salvar!', error: error.message });
    });
}