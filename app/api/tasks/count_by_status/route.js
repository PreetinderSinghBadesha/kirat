import clientPromise from '@/lib/mongodb';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db('kirat');
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const tasks = await db.collection('tasks').find({ userId: user?.id }).toArray();

        if (!tasks) {
            return new Response(JSON.stringify({ error: 'Tasks not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const taskCountByStatus = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});

        return new Response(JSON.stringify({ taskCountByStatus }), {
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
