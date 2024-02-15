import { Request, Response } from 'express';
import * as usuarioDao from '../dao/usuarioDao';
import  {Usuario}  from '../models/Usuario';

export const Salvar = async (req: Request, res: Response) => {
    const usuario: Usuario = req.body;
    await usuarioDao.Salvar(usuario);
    res.status(200).json(usuario);
};

export const Listar = (req: Request, res: Response) =>{
    usuarioDao.Listar().then(promise => {
        res.status(200).json(promise);
    })
}

export const Consultar = (req: Request, res: Response) => {
    const id = req.params.id;
    const usuario: Usuario | undefined = undefined; // Supondo que você busca o usuário no banco de dados e retorna undefined se não encontrado
    if (usuario) {
        res.status(200).json(usuario); // Responder com o usuário encontrado
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' }); // Responder com mensagem de erro se usuário não encontrado
    }
}

export const Atualizar = (req: Request, res: Response) => {
    const id = req.params.id; // Obter o ID do parâmetro da URL
    const usuario: Usuario = req.body; // Obter os dados atualizados do corpo da requisição
    // Lógica para atualizar o usuário com o ID especificado
    // Aqui você deve adicionar a lógica para atualizar o usuário com o ID especificado no banco de dados
    res.status(200).json({ message: 'Usuário atualizado com sucesso' }); // Responder com mensagem de sucesso
}

export const Excluir = (req: Request, res: Response) => {
    const id = req.params.id; // Obter o ID do parâmetro da URL
    // Lógica para deletar o usuário com o ID especificado
    // Aqui você deve adicionar a lógica para deletar o usuário com o ID especificado no banco de dados
    res.status(200).json({ message: 'Usuário deletado com sucesso' }); // Responder com mensagem de sucesso
}


function sicrona(){
 assicrona()
}

async function assicrona() {
    
}