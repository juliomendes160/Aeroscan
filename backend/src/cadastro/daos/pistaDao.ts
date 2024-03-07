import {MongoClient, ObjectId} from 'mongodb';
import { Pista } from '../models/Pista';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('pista');

export const Salvar = async (pista: Pista) => {
    try {
        client.connect();
        await collection.insertOne(pista);
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

export const Atualizar = async (id: ObjectId, pista: Pista) => {
    try {
        client.connect();
        return await collection.updateOne(
            { _id: id },
            { $set: { 
                'pista':pista,
                'endereco': pista.endereco
            }}
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