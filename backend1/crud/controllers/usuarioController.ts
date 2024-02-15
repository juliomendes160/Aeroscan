import { Request, Response } from 'express';
import  {Usuario}  from '../models/Usuario';

export const Salvar = (req: Request, res: Response) => {
    console.log("Salvar");
    // const usuario: Usuario = req.body;
    // res.status(200).json(usuario);
};

export const Listar = (req: Request, res: Response) => {
    const usuarios: Usuario[] = []; 
    res.status(200).json(usuarios);
};

export const Consultar = (req: Request, res: Response) => {
    const id = req.params.id; // Obter o ID do parâmetro da URL
    // Lógica para obter o usuário com o ID especificado
    // Aqui você deve adicionar a lógica para buscar o usuário com o ID especificado no banco de dados
    const usuario: Usuario | undefined = undefined; // Supondo que você busca o usuário no banco de dados e retorna undefined se não encontrado
    if (usuario) {
        res.status(200).json(usuario); // Responder com o usuário encontrado
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' }); // Responder com mensagem de erro se usuário não encontrado
    }
};

export const Atualizar = (req: Request, res: Response) => {
    const id = req.params.id; // Obter o ID do parâmetro da URL
    const usuario: Usuario = req.body; // Obter os dados atualizados do corpo da requisição
    // Lógica para atualizar o usuário com o ID especificado
    // Aqui você deve adicionar a lógica para atualizar o usuário com o ID especificado no banco de dados
    res.status(200).json({ message: 'Usuário atualizado com sucesso' }); // Responder com mensagem de sucesso
};

export const Excluir = (req: Request, res: Response) => {
    const id = req.params.id; // Obter o ID do parâmetro da URL
    // Lógica para deletar o usuário com o ID especificado
    // Aqui você deve adicionar a lógica para deletar o usuário com o ID especificado no banco de dados
    res.status(200).json({ message: 'Usuário deletado com sucesso' }); // Responder com mensagem de sucesso
};