
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const serverUrl = 'http://localhost:5000/graphql';

const client = new ApolloClient({ // Create a new Apollo Client instance
  uri: serverUrl,
  cache: new InMemoryCache(),
});

export const getAllWords = async () => { // Function to fetch all words
  const result = await client.query({
    query: gql`
      {
        words {
          word
          entries {
            partOfSpeech
            origin
            definitions
            examples
          }
        }
      }
    `,
  });
  return result.data.words;
};

export const addNewWord = async (word) => {
  console.log("word => ", word);
  try {
    const result = await client.mutate({     // Define the GraphQL mutation string using gql template literal
      mutation: gql`
        mutation AddWord($word: String!) {
          addWord(word: $word) {
            word
            entries {
              partOfSpeech
              origin
              definitions
              examples
            }
          }
        }
      `,
      variables: {
        word, // Passing the word as a variable
      },
    });
    console.log("result - ", result);
    return result.data.addWord; // Return the newly added word information from the result
  } catch (error) {
    console.error("GraphQL error:", error);
  }
};
