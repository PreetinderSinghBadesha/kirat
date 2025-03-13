export const users = [
    { id: 1, name: "Preetinder Singh"},
    { id: 2, name: "Rajas Bhatnagar"},
]

export async function GET() {
    return Response.json({"message" : "Hello"});
}

export async function POST(request) {
    
}