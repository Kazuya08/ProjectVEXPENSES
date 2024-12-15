import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = [
    { id: 1, username: 'Thiago', password: await bcrypt.hash('senha', 10) },
    { id: 1, username: 'Kaio', password: await bcrypt.hash('senha', 10) },
    { id: 1, username: 'Matheus', password: await bcrypt.hash('senha', 10) },
    { id: 1, username: 'Dimitry', password: await bcrypt.hash('senha', 10) },
];

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'mysecretkey';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const user = users.find((user) => user.username === username);

    if (!user) {
        return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Senha inválida' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
    });

    const response = NextResponse.json({ message: 'Autenticado com sucesso' });
    response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
    });

    return response;
}
