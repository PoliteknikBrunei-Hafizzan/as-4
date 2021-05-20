const { ApolloServer, gql } = require('apollo-server');

const schema = gql(`
  type Query {
    currentUser: User
    postsByUser(userId: String!): [Post]
  }

  type Mutation {
    addPost(content: String): Post 
  }

  type User {
    id: ID!
    username: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    content: String!
    userId: ID!
  }
`);

var data = {};

data.posts = [
  { 
    id: 'xyz-1',
    content: "First Post - Hello world",
    userId: 'abc-1',
  },
  {
    id: 'xyz-2',
    content: "Second Post - Hello again",
    userId: 'abc-1',
  },
  {
    id: 'xyz-3',
    content: "Random Post",
    userId: 'abc-2',
  }
];

data.users = [
  {
  id: 'abc-1',
  username: "ampuanzinal",
  },
  {
  id: 'abc-2',
  username: "hilmisabli",
  },
  {
  id: 'abc-3',
  username: "shariffudinsablee",
  }
 ];

const currentUserId = 'abc-1';

var resolvers = {
  Mutation: {
    addPost: async (_, { content }, { currentUserId, data }) => {
      let post = { 
        id: 'xyz-' + (data.posts.length + 1), 
        content: content, 
        userId: currentUserId,
      };
      data.posts.push(post);
      return post;
    }
  },
  Query: {
    currentUser: (parent, args, context) => {
      let user = context.data.users.find( u => u.id === context.currentUserId );
      return user;
    },
    postsByUser: (parent, args, context) => {
      let posts = context.data.posts.filter( p => p.userId === args.userId ); 
      return posts
    },
  },
  User: {
    posts: (parent, args, context) => {
      let posts = context.data.posts.filter( p => p.userId === parent.id );
      return posts;
    }
  }
};

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,
  context: { 
    currentUserId,
    data
  }
});

server.listen(4001).then(({ url }) => {
  console.log('API server running at localhost:4001');
});
