import { Box, VStack, Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'

function Loading({ props }) {


    return (
        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>
    )
}

export default Loading
