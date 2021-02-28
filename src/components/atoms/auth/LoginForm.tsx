import { Button, ButtonGroup, Input, InputGroup, InputRightElement, Stack, useToast } from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router';
import React from 'react'

function LoginForm({ csrfToken }) {
    const [isLogin, setIsLogin] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [emailInput, setEmailInput] = React.useState('')
    const [show, setShow] = React.useState(false);
    const router = useRouter()
    const toast = useToast()
    const { error, email, senha, textEmail } = router.query

    React.useEffect(() => {
        // Getting the error details from URL
        if (error) {
            setEmailInput(textEmail?.toString() ?? '');
            setIsError(true)
            toast({
                title: "Credenciais inválidas.",
                description: "Tente novamente com credenciais corretas.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }, [router])

    const handleClick = () => setShow(!show);

    const loginUser = async event => {
        event.preventDefault() // don't redirect the page
        setIsLogin(!isLogin);
        const { email, senha } = event.target;

        console.log('void', email);
        if (email.value && senha.value) {
            signIn('credentials', { email: email.value, senha: senha.value, callbackUrl: `${process.env.NEXT_PUBLIC_URL_REDIRECT_POS_LOGIN}` });
        }
        setIsLogin(!isLogin);
    }


    return (
        <form onSubmit={loginUser}>
            <Stack spacing={3}>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

                <Input
                    isInvalid={email?.includes('1') && isError}
                    placeholder="E-mail"
                    name="email"
                    size="md"
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setIsError(false) }}
                    isDisabled={isLogin} />

                <InputGroup size="md">
                    <Input
                        isInvalid={email?.includes('1') && isError || senha?.includes('1') && isError}
                        isDisabled={isLogin}
                        pr="4.5rem"
                        name="senha"
                        onChange={() => { setIsError(false) }}
                        type={(show && !isLogin) ? "text" : "password"}
                        placeholder="Digite a senha"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" isDisabled={isLogin} onClick={handleClick}>
                            {(show && !isLogin) ? "Esconder" : "Mostrar"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <ButtonGroup spacing={4}>
                    <Button
                        w="100%"
                        type="submit"
                        isLoading={isLogin}
                        loadingText="Entrando"
                    > Entrar </Button>
                </ButtonGroup>
            </Stack>
        </form>
    )
}

export default LoginForm
