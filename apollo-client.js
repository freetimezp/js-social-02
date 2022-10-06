import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: "https://fangshan.stepzen.net/api/modest-salamander/__graphql",
    headers: {
        Authorisation: `ApiKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
    },
    watchQuery: {
        fetchOptions: {
            mode: 'no-cors',
        },
    },
    cache: new InMemoryCache(),
});

export default client;