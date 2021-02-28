import { Box } from '@chakra-ui/react'
import React from 'react'

function Card(props) {
    return (
        <Box rounded="md" p={3} shadow="md" bg="white" {...props}>
            {props.children}
        </Box>
    )
}

export default Card
