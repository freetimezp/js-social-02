import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://fangshan.stepzen.net/api/modest-salamander/__graphql",
    headers: {
        Authorisation: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
    },
});

export default client;

