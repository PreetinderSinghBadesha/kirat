import clientPromise from '@/lib/mongodb'
import taskSchema from '@/schemas/task_schema'
import { ObjectId } from 'mongodb'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
    try {
        const client = await clientPromise
        const db = client.db('Kirat')
        const tasks = await db.collection('tasks').find({}).toArray()

        return Response.json({ tasks })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Error connecting to database' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function POST(request) {
    try {
        const taskData = await request.json()

        if (!taskData.id) {
            const { getUser } = getKindeServerSession();
            const user = await getUser();
            taskData.id = new ObjectId()
            taskData.userId = user?.id
        }

        const now = new Date()
        taskData.createdAt = now
        taskData.updatedAt = now
        taskData.status = 'in-progress'

        // Remove id field from micro tasks
        taskData.microTask = taskData.microTask.map(microTask => ({
            ...microTask
        }));

        const { error } = taskSchema.validate(taskData)

        if (error) {
            return new Response(JSON.stringify({ error: error.details[0].message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const client = await clientPromise
        const db = client.db('Kirat')
        const result = await db.collection('tasks').insertOne(taskData)

        return new Response(JSON.stringify({ task: result }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Error connecting to database' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}


export async function PUT(request) {
    try {
        const { id, ...updateData } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'Task ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const now = new Date();
        updateData.updatedAt = now;

        const { error } = taskSchema.validate({ id: new ObjectId(id), ...updateData }, { allowUnknown: true });

        if (error) {
            return new Response(JSON.stringify({ error: error.details[0].message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('Kirat');

        const result = await db.collection('tasks').updateOne(
            { id: new ObjectId(id) },
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

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'Task ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('Kirat');
        const result = await db.collection('tasks').deleteOne({ id: new ObjectId(id) });

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
        return new Response(JSON.stringify({ error: 'Error deleting task' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
