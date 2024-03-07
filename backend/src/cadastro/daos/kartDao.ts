import {MongoClient, ObjectId} from 'mongodb';
import { Kart } from '../models/Kart';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('aeroscan');
const collection = database.collection('kart');

export const Salvar = async (kart: Kart) => {
    try {
        client.connect();
        await collection.insertOne(kart);
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

export const Atualizar = async (id: ObjectId, kart: Kart) => {
    try {
        client.connect();
        return await collection.updateOne(
            { _id: id },
            { $set: { 
                'nome': kart.nome, 
                'marca': kart.marca,
                'modelo': kart.modelo, 
                'potencia': kart.potencia,
                'pneus': kart.pneus, 
                'status': kart.status,
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