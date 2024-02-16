import {MongoClient, ObjectId} from 'mongodb';
import { Usuario } from '../models/Usuario';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('usuario');

export const Salvar = async (usuario: Usuario) => {
    try {
        client.connect();
        await collection.insertOne(usuario);
    } finally {
        await client.close();
    }
}

export const Listar = async () => {
    try {
        client.connect();
        return await collection.find().toArray();
    } finally {
        await client.close();
    }
}

export const Consultar = async (id: ObjectId) => {
    try {
        client.connect();
        return await collection.findOne({ _id: id });
    } finally {
        await client.close();
    }
}

export const Atualizar = async (id: ObjectId, usuario: Usuario) => {
    try {
        client.connect();
        return await collection.updateOne(
            { _id: id },
            { $set: 
                { 
                    'id': usuario.id,
                    'nome': usuario.nome,
                    'tipo': usuario.tipo
                }
            }
        );
    } finally {
        await client.close();
    }
}

export const Excluir = async (id: ObjectId) => {
    try {
        client.connect();
        return await collection.deleteOne({ _id: id });
    } finally {
        await client.close();
    }
}