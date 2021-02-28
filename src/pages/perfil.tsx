import { session, signIn, signOut, useSession } from 'next-auth/client';
import React from 'react'
import { useRouter } from "next/router";
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Layout from '../components/Layout/Layout';
import ContainerMain from '../components/Layout/ContainerMain';
import Loading from '../components/atoms/Loading';
import { Button, Divider, Text } from "@chakra-ui/react";
import Link from 'next/link';
import { User } from '../types/user';

function PerfilPage() {
    const [session, loading] = useSession();
    const router = useRouter();
    let user: User
    if (session) {
        user = session.user as User;
    }

    return (
        <Layout>
            <Head>
                <title>Perfil | Next-Auth.js.org</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header shadow="md" />
            <ContainerMain>
                {loading ?
                    <Loading />
                    : session ?
                        <>
                            <Text fontSize="2xl" fontWeight="bold">Bem-vindo(a) {user.nome}</Text>
                            <Divider marginY={3} />
                            <Text fontSize="xl" sx={{ "a": { color: 'var(--linkColor)', fontWeight: 'bold' } }}>
                                Você logou com sucesso! Este é seu email de cadastro: {user.email}, sua sessão tem duração de 1 minuto.<br />
                                Quer sair? <Button type="button" onClick={() => signOut()}>Sair</Button>
                            </Text>
                        </>
                        :
                        <>
                            <Text fontSize="2xl" fontWeight="bold"> Acesso negado!</Text>
                            <Divider marginY={3} />
                            <Text fontSize="xl" sx={{ "a": { color: 'var(--linkColor)', fontWeight: 'bold' } }}>
                                Para acessar está pagina você deve realizar o login <Link href="/auth/login">aqui</Link> ou efetue o registro <Link href="/auth/registro">aqui.</Link>
                            </Text>
                        </>

                }
            </ContainerMain>
        </Layout>
    )
}

export default PerfilPage
