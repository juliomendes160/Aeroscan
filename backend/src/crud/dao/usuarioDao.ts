import {MongoClient} from 'mongodb';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('usuario');

export const Salvar = async (usuario: any) => {
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