import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: "http://localhost:5001/api/modest-salamander",
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