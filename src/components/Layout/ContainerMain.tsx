import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

function ContainerMain(props) {
    return (
        <Flex justify="center" width="100%" >
            <Box
                bg="white"
                marginX={{ base: 4, lg: 0 }}
                p={4}
                shadow="md"
                rounded="md"
                width={{ base: "100%", md: "90%", lg: "80%" }}
                {...props}>
                {props.children}
            </Box>
        </Flex>
    )
}

export default ContainerMain
