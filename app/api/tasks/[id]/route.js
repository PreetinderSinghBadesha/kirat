import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, context) {
    try {
        const { params } = await context;
        const client = await clientPromise;
        const db = client.db('Kirat');
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

export async function DELETE(request, context) {
    try {
        const { params } = await context;
        const client = await clientPromise;
        const db = client.db('Kirat');
        const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(params.id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Task not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Task deleted successfully' }), {
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

export async function PUT(request, context) {
    try {
        const { params } = await context;
        const updateData = await request.json();

        if (!params.id) {
            return new Response(JSON.stringify({ error: 'Task ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const now = new Date();
        updateData.updatedAt = now;

        const client = await clientPromise;
        const db = client.db('Kirat');

        const result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Task not found' }), {
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
        return new Response(JSON.stringify({ error: 'Error updating task' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}