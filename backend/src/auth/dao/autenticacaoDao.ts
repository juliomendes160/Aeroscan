import {MongoClient, ObjectId} from 'mongodb';
import { Autenticacao } from '../models/Autenticacao';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('autenticacao');

export const Login = async (autenticacao: Autenticacao) => {
    try {
        client.connect();
        const database = await collection.findOne({ usuario: autenticacao.usuario });
        if(database){
            database.senha == autenticacao.senha;
            return true;
        }
        return false;
    } finally {
        await client.close();
    }
}