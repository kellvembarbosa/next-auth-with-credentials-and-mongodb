import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import React from "react";
import NProgress from 'next-nprogress-emotion';

const colors = {
    primary: {
        100: "#efeef6",
        200: "#d0cde5",
        300: "#928ac1",
        400: "#8279b9",
        500: "#6358a7",
        600: "#4f4686",
        700: "#453e75",
        800: "#3b3564",
        900: "#322c54"
    }
}

const customTheme = extendTheme({ colors });

export default function App({ Component, pageProps }) {

    return (
        <Provider session={pageProps.session}>
            <ChakraProvider theme={customTheme}>
                <NProgress
                    color="#29d"
                    options={{ trickleSpeed: 50 }}
                    showAfterMs={300}
                    spinner
                />
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    )
}