import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './App';
import Login from './components/Login';
import Todo from './components/Todo';

const httpLink = new HttpLink({ uri: 'https://intense-sierra-67303.herokuapp.com/gql' });

const authWare = new ApolloLink((operation, forward) => {
  // check if token exists then we append it to every requests
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        'x-auth': token
      }
    });
  }

  // now we map each responses and check if token is
  // passed in the headers so we can store it in localStorage
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get('x-auth');
      if (token) {
        localStorage.setItem('token', token);
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  link : authWare.concat(httpLink),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

const Root = () => (
    <ApolloProvider client={client}>
        <App>
          <Router>
            <Switch>
              <Route exact path="/" component={Todo} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </App>
    </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));