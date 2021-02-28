import { Box, Stack, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import Loading from "../../atoms/Loading";
import { MenuItem } from './MenuItem'

export const MenuLinks = ({ isOpen }) => {
    const [session, loading] = useSession()

    if (loading) {
        return <Loading />;
    }

    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}>

                <MenuItem to="/">Início</MenuItem>
                <MenuItem to="/perfil">Perfil </MenuItem>
                {!session && <MenuItem to="/auth/login">Login </MenuItem>}
                <MenuItem to="/auth/registro" isSignOut={session ? true : false} isLast>
                    <Button
                        size="sm"
                        rounded="md"
                        color={{ base: "primary.500", lg: "white" }}
                        bg={{ base: "white", lg: "primary.500" }}
                        _hover={{
                            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                        }}
                    >
                        {session ? 'Sair' : 'Registro'}
                    </Button>
                </MenuItem>
            </Stack>
        </Box>
    );
};
