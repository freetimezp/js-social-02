import React from "react";
import '../styles/globals.css';
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react";
import type {AppProps} from 'next/app';
import Header from "../components/Header";
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps<{session: Session}>) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={session}>
                <div className="h-screen overflow-y-scroll bg-slate-200">
                    <Header />
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </ApolloProvider>
    );
}

export default MyApp;
