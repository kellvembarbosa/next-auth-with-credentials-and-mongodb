import { Text } from "@chakra-ui/react"
import { signOut } from "next-auth/client"
import Link from "next/link"
import React from "react"

interface MenuItemProps {
    children?: React.ReactNode;
    isLast?: boolean;
    to: string;
    rest?: any;
    isSignOut?: boolean;
}

export const MenuItem = ({ children, isLast, to = "/", isSignOut = false, ...rest }: MenuItemProps) => {
    return !isSignOut ?
        <Link href={to} passHref>
            <Text cursor="pointer" display="block" {...rest}>
                {children}
            </Text>
        </Link>
        : <Text onClick={() => signOut()} cursor="pointer" display="block" {...rest}>
            {children}
        </Text>


}