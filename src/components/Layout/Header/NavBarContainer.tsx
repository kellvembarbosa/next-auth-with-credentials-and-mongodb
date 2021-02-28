import { Flex } from "@chakra-ui/react";
import React from "react";

export const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={4}
            p={8}
            bg={{ base: "primary.500", lg: "white" }}
            color={{ base: "white", lg: "primary.700" }}
            {...props}
        >
            {children}
        </Flex>
    );
};