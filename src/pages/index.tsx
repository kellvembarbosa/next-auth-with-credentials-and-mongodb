import Head from 'next/head'
import React from 'react'
import ContainerMain from '../components/Layout/ContainerMain'
import Header from '../components/Layout/Header'
import Layout from '../components/Layout/Layout'
import { Divider, Text } from "@chakra-ui/react";
export default function Home({ isConnected }) {
  return (
    <Layout>
      <Head>
        <title>Next-Auth.js.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header shadow="md" />
      <ContainerMain>
        <Text fontSize="xl" fontWeight="bold">Primeira implementação do Next-Auth JS</Text>
        <p>Este foi meu primeiro projeto utilizando o next-auth.js.org, fiz a utilização do provedor de login credentials que precisa de um api
        propria para login, fiz a api utilizando o banco de dados MongoDB.

          <br /> Utilizei na criação da UI a biblioteca @chakra-ui, que é um design system basedo em styled-components.
          <br /> Este projeto demonstra a capacidade de desenvolvimento do NextJS, um projeto full stack focado no login.

        </p>
        <br />
        <Divider />
        <br />
        <Text fontSize="xl" fontWeight="bold">Para visualizar a página do perfil, é obrigatório o login.  </Text>
      </ContainerMain>
    </Layout>
  )
}
