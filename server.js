const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = process.env.PORT || 4000;

const schema = buildSchema(`
  type Query {
    sample1: String
    sample2: Int
    sample3: [Int]
  }
`);

const root = {
  sample1: () => {
        return "Sample"
      },
  sample2: () => {
    return 1 + Math.floor(Math.random() * 100)
  },
  sample3: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);