import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react'
import { connectToDatabase } from '../../../../util/mongodb';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();

            const { nome, email, senha } = body;
            console.log(nome, email, senha);
            if (!nome || !email || !senha)
                throw new Error("Todos os campos devem ser preenchidos");

            if (!email.includes('@'))
                throw new Error("Email não é válido");

            const hash = await bcrypt.hash(senha, parseInt(process.env.BYCRYPT_SALTROUNDS));

            if (!hash)
                throw new Error("Error no servidor código do erro: KB012");

            const newUser = await db.collection('users').updateOne(
                { email: email.toString() },
                {
                    $setOnInsert: {
                        nome: nome,
                        email: email,
                        senha: hash,
                        admin: false,
                        rules: 1
                    }
                },
                { upsert: true }
            );

            if (!newUser?.result?.upserted)
                throw new Error("E-mail já está em uso!");

            // const resSingin = await signIn('credentials', {
            //     email,
            //     senha,
            //     redirect: false,
            // });

            res.status(200).send({ error: false, id: newUser.upsertedId._id, nome, email, admin: false, rules: 1 });

        } else
            res.status(404).send('Not found');

    } catch (error) {
        res.status(200).send({ error: true, message: error.message });
    }
}
