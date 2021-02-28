import { Flex } from '@chakra-ui/react'
import React from 'react'

function Layout(props) {
    return (
        <Flex sx={{ "--linkColor": "#6358a7" }} minHeight="100vh" width="100%" flexDirection="column" bg="gray.200" {...props}>
            { props.children}
        </Flex>
    )
}

export default Layout
