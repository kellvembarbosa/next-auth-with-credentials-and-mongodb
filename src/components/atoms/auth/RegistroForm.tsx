import { InputGroup, Input, InputRightElement, Button, Stack, ButtonGroup, useToast } from '@chakra-ui/react';
import { signin } from 'next-auth/client';
import React, { useState } from 'react'
import { API } from '../../../services/api';

function RegistroForm() {

    const [show, setShow] = React.useState(false);
    const [registrando, setRegistrando] = React.useState(false)
    const handleClick = () => setShow(!show);
    const toast = useToast()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const registroUsuario = async () => {
        setRegistrando(true);

        if (!nome && !email && !senha)
            showError(`Todos os campos são necessários!`)
        else {
            try {
                const register = await API.post('/auth/registro', {
                    nome: nome,
                    email: email,
                    senha: senha
                });
                const { error, message } = register.data;

                if (error)
                    throw new Error(message);
                else {
                    toast({
                        title: "Criado com sucesso!",
                        description: "Você será redireciando automaticamente.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    await signin('credentials', { email: email, senha: senha, callbackUrl: `${process.env.NEXT_PUBLIC_URL_REDIRECT_POS_LOGIN}` })
                }
            } catch (error) {
                showError(error.message)
            }
        }
    }

    const showError = (error: string) => {
        toast({
            title: "Erro ao criar conta!",
            description: error,
            status: "error",
            duration: 9000,
            isClosable: true,
        })

        setRegistrando(false);
    }

    return (
        <Stack spacing={2}>
            <Input
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                name="nome"
                size="md"
                isDisabled={registrando} />
            <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                name="email"
                size="md"
                isDisabled={registrando} />
            <InputGroup size="md">
                <Input
                    onChange={(e) => setSenha(e.target.value)}
                    isDisabled={registrando}
                    pr="4.5rem"
                    type={(show && !registrando) ? "text" : "password"}
                    placeholder="Digite a senha"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" isDisabled={registrando} onClick={handleClick}>
                        {(show && !registrando) ? "Esconder" : "Mostrar"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <ButtonGroup spacing={4}>
                <Button
                    w="100%"
                    onClick={() => registroUsuario()}
                    isLoading={registrando}
                    loadingText="Registrando"
                > Registrar </Button>
            </ButtonGroup>
        </Stack>

    );
}

export default RegistroForm
