const { buildSchema } = require('graphql');
//import types
const typeDefs = require("./types");
//build schema
const schema = buildSchema(typeDefs);

module.exports = schema;
