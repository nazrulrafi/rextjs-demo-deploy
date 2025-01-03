



import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            const client = await MongoClient.connect("mongodb+srv://nazrulrafi:nJhGdosohk5s2kkZ@cluster0.1cyjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            const db = client.db();
            const meetupsCollection = db.collection('meetups');

            const result = await meetupsCollection.insertOne(data);
            client.close();

            res.status(201).json({ message: 'Meetup inserted!', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Database operation failed.', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
}




