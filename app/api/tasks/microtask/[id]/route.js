import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, context) {
    try {
        const { params } = await context;
        const { id: microTaskIndex } = params;

        const client = await clientPromise;
        const db = client.db('Kirat');

        const task = await db.collection('tasks').findOne(
            { "microTask": { $exists: true } },
            { projection: { microTask: { $slice: [parseInt(microTaskIndex), 1] } } }
        );

        if (!task || !task.microTask || task.microTask.length === 0) {
            return new Response(JSON.stringify({ error: 'Micro Task not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ microTask: task.microTask[0] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error fetching micro task' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request, context) {
    try {
        const { taskId, ...updateData } = await request.json();
        const { params } = await context;
        const { id: microTaskIndex } = params;

        if (!taskId || microTaskIndex === undefined) {
            return new Response(JSON.stringify({ error: 'Task ID and Micro Task Index are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('Kirat');

        const result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { [`microTask.${microTaskIndex}.completed`]: updateData.completed } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Micro Task not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, updated: result.modifiedCount }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error updating micro task' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
