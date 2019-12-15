import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


// --- --- --- --- --- --- --- 
// Query
// --- --- --- --- --- --- --- 
const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5, isFork: false) {
        nodes {
          id
          name
          url
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

// --- --- --- --- --- --- --- 
// Mutation
// --- --- --- --- --- --- --- 
const ADD_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;


const App = () => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading) return <p>Loading...</p>;

      const repositories = data.organization.repositories.nodes;

      return (
        <div>
            <img src={logo} name="logo"/>
            <ul>
              {repositories.map(repo => (
                <li key={repo.id}>
                  <a href={repo.url}>{repo.name}</a>
                  <button>{repo.stargazers.totalCount} Stars</button>

                  {/* star 出しわけ */}  
                  {!repo.viewerHasStarred ? (
                    <Mutation
                      mutation={ADD_STAR_REPOSITORY}
                      variables={{ id: repo.id }}
                    >
                      {(addStar, { data, loading, error }) => (
                        <button onClick={addStar}>star</button>
                      )}
                    </Mutation>
                  ) : (
                    <Mutation
                      mutation={REMOVE_STAR_REPOSITORY}
                      variables={{ id: repo.id }}
                    >
                      {(removeStar, { data, loading, error }) => (
                        <button onClick={removeStar}>unstar</button>
                      )}
                    </Mutation>
                  )}
                </li>
              ))}
            </ul>
        </div>
      );
          
    }}
        
  </Query>
    
);

export default App;