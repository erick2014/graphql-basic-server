var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`

  type MyUser{
    id:ID
    firstName:String
    lastName:String
    email:String
  }

  type Client{
    id:ID
    name:String
    avatar:String
    phone:String
  }
 
  type Query{
    hello(myName:String):String
    UserInfo(id:ID!):MyUser
    Users:[MyUser]
    Clients:[Client]
  }

`);

module.exports = schema;