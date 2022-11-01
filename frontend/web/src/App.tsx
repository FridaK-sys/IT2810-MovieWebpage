import 'antd/dist/antd.css';
import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PageHeader, Typography } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Films from './components/Films';
import { Provider } from "react-redux";
import { relayStylePagination } from "@apollo/client/utilities";
import store from "./redux/store";

const { Paragraph } = Typography;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: relayStylePagination(),
        },
      },
    },
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
    <Provider store = {store}>
        <Router>
          <PageHeader
            className="site-page-header m-4"
            title="The film database"
          >
            <>
            <Paragraph
            style={{fontSize: 18}}>
              The database shows a selection of films released from 1900 to the present day. 
              Each film is described with its title, year of release, cast and genre. 
              It is possible to find a desired movie by filtering on one or a combination of these values. 
              Furthermore, it is possible to sort the data in ascending or descending order by its year of release. 
              It is also possible for the user to add their own films to the database.
            </Paragraph>
            </>
          </PageHeader>
          <Routes>
            <Route path="/project3" element={ <Films /> } />
          </Routes>
        </Router>
        </Provider>
      </ApolloProvider>
  );
}

export default App;
