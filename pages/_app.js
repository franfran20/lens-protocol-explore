import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { MoralisProvider } from "react-moralis";

const client = new ApolloClient({
  uri: "https://api-mumbai.lens.dev",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default MyApp;
