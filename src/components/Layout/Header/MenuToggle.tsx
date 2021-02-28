import React from "react"
import { Box } from "@chakra-ui/react"
// import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { MenuIcon, CloseIcon } from "../../atoms"

export const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    )
}