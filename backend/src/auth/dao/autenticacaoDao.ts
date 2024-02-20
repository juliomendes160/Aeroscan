import {MongoClient} from 'mongodb';
import { Autenticacao } from '../models/Autenticacao';
import jwt from 'jsonwebtoken';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('autenticacao');

export const Register = async (autenticacao: Autenticacao) => {
    try {
        client.connect();
        await collection.insertOne(autenticacao);
    } finally {
        await client.close();
    }
}

export const Login = async (autenticacao: Autenticacao) => {
    try {
        client.connect();
        const result = await collection.findOne({ usuario: autenticacao.usuario });
        
        if(result && result.senha === autenticacao.senha){
            const payload = {
                usuario: result.usuario,
                timestamp: Date.now()
              };
              
            const token = jwt.sign(payload, 'chave-secreta');
            return token;
        }

    } finally {
        await client.close();
    }
}