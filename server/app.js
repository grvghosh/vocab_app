
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
require("dotenv").config();

// Initialize the express app
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Connect to MongoDB using environment variables
mongoose.connect(process.env.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the MongoDB connection is successful
mongoose.connection.once("open", function() {
  console.log("Database connected...");
});

// Use GraphQL as middleware for handling API requests
app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true, // Enable the GraphiQL tool for testing GraphQL queries
}));

// Start the server and listen on a port
const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
