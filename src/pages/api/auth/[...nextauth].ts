import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../../util/mongodb';
// opcional para db custom... 
import bcrypt from 'bcrypt';

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
    pages: {
        signIn: '/auth/login',
        error: '/auth/login'
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            user && (token.user = user);
            return token
        },
        async session(session, user) {
            const newSession = { ...session.user, ...user }
            return newSession
        }
    },
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'E-mail e senha.',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "E-mail", type: "text", placeholder: "Insira seu e-mail" },
                password: { label: "Senha", type: "senha", placeholder: "Insira sua senha" },
            },
            async authorize(credentials) {
                try {
                    // buscar na api ou na db
                    const { db } = await connectToDatabase();
                    const userDb = await db.collection('users').findOne({ email: credentials.email })

                    if (!userDb)
                        throw new Error("&email=1");

                    if (userDb) {
                        // não seria necessário o bcrypt para uma api já pronta...
                        const match = await bcrypt.compare(credentials.senha, userDb.senha);
                        if (userDb && match) {
                            const user = {
                                id: userDb._id,
                                nome: userDb.nome,
                                email: userDb.email,
                                admin: userDb.admin,
                                roles: userDb.roles
                            };

                            return user
                        } else {
                            throw new Error(`&senha=1&textEmail=${credentials.email}`);
                        }
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    database: process.env.MONGODB_URI,
    session: {
        jwt: true,
        maxAge: 60,// 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
});