import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: "https://intense-sierra-67303.herokuapp.com/gql"
});

const Root = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

