import React from "react"
import { Box, Text } from "@chakra-ui/react"

export function Logo(props) {
    return (
        <Box {...props}>
            <Text fontSize="lg" fontWeight="bold">
                Logo
            </Text>
        </Box>
    )
}