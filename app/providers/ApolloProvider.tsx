"use client";
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://graphql.anilist.co", // Replace with your endpoint
    cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider client={client}>{children}</Provider>;
}
