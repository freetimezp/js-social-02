import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: "https://fangshan.stepzen.net/api/modest-salamander/__graphql",
    headers: {
        Authorisation: `ApiKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
        "key": "access-control-allow-origin",
        "value": "*"
    },
    cache: new InMemoryCache(),
});

export default client;