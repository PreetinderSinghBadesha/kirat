import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db('kirat');
        const task = await db.collection('tasks').findOne({ _id: new ObjectId(params.id) });

        if (!task) {
            return new Response(JSON.stringify({ error: 'Task not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ task }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error connecting to database' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
