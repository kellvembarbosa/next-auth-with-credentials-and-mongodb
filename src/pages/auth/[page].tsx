import React from 'react'
import Card from '../../components/atoms/Card'
import Layout from '../../components/Layout/Layout'
import { Box, Divider, Flex, Input, Stack, Text } from "@chakra-ui/react";
import RegistroForm from "../../components/atoms/auth/RegistroForm";
import Login from '../../components/Login';
import { csrfToken, getSession, useSession } from 'next-auth/client';
import LoginForm from '../../components/atoms/auth/LoginForm';
import { useRouter } from 'next/router';
import Loading from '../../components/atoms/Loading';
import Head from 'next/head';

function RegistroPage({ csrfToken }) {
    const router = useRouter();
    const { page } = router.query;
    const [isLogin, setIsLogin] = React.useState(page.toString() == 'registro' ? true : false)

    return (
        <Layout bgColor="primary.500" justifyContent="center" alignItems="center">
            <Head>
                <title> {isLogin ? 'Registro' : 'Login'}</title>
            </Head>
            <Card width={{ base: '93%', sm: "400px" }}>

                <Text fontSize="2xl" fontWeight="bold">{isLogin ? "Registro" : "Login"}</Text>
                <Divider my={3} />

                {isLogin ? <RegistroForm /> : <LoginForm csrfToken={csrfToken} />}

                <Flex width="100%" justifyContent="flex-end" mt={3}>
                    <Text
                        cursor="pointer"
                        onClick={() => setIsLogin(!isLogin)}
                        _hover={{ color: 'primary.300' }}
                        color="primary">
                        {isLogin ? 'Já possui conta?' : 'Não tem conta?'}
                    </Text>
                </Flex>
            </Card>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (context.res && !session) {
        return {
            props: { csrfToken: await csrfToken(context) }
        }
    }

    return {
        props: { csrfToken: await csrfToken(context) },
        redirect: {
            permanent: false,
            destination: process.env.NEXT_PUBLIC_URL_REDIRECT_POS_LOGIN
        }
    }
}

// RegistroPage.getInitialProps = async (context) => {
//     const session = await getSession(context)
//     if (session) {
//         context.res.writeHead(302, {
//             Location: process.env.NEXT_PUBLIC_URL_REDIRECT_POS_LOGIN
//         });
//         context.res.end();
//     }
//     return {
//         csrfToken: await csrfToken(context)
//     }
// }

export default RegistroPage
