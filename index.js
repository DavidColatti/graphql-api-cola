const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const startServer = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    const res = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );
  } catch (err) {
    console.error(`Error connecting to mongo ${err}`);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
      reportSchema: true,
    },
  });

  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
