import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Hardcoded data store
const Users = [
  {
    id: 1,
    name: "Fikayo Adepoju",
    email: "fik4christ@yahoo.com",
    posts: [
      {
        id: 1,
        title: "Debugging an Ionic Android App Using Chrome Dev Tools",
        published: true,
        link:
          "https://medium.com/@coderonfleek/debugging-an-ionic-android-app-using-chrome-dev-tools-6e139b79e8d2",
        author: 1
      },
      {
        id: 2,
        title: "Hosting a Laravel Application on Azure Web App",
        published: true,
        link:
          "https://medium.com/@coderonfleek/hosting-a-laravel-application-on-azure-web-app-b55e12514c46",
        author: 1
      }
    ]
  },
  {
    id: 3,
    name: "Jane Paul",
    email: "jane@company.com",
    posts: []
  }
];

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    users: [User!]!,
    user(id: Int!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    published: Boolean!
    link: String
    author: User!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    users: async () => {
      return Users;
    },
    user: async (_, { id }) => {
      const user = User.find((user) => user.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },
};

// Pass schema definition and resolvers to the ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Launch the server
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);