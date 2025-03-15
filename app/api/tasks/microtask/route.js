import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
    try {
        const { taskId, ...microTaskData } = await request.json();

        if (!taskId) {
            return new Response(JSON.stringify({ error: 'Task ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('Kirat');

        const result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(taskId) },
            { $push: { microTask: microTaskData } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Task not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, microTask: microTaskData }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error creating micro task' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
