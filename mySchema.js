var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  input MessageInput{
    content:String,
    author:String
  }

  type MyUser{
    id:ID
    firstName:String
    lastName:String
    email:String
  }

  type Message{
    id:ID!
    content:String
    author:String
  }
 
  type Query{
    hello(myName:String):String
    getMessage(id:ID!):Message
    getUserInfo(id:ID!):MyUser
    Users:[MyUser]
  }

  type Mutation{
    createMessage( input:MessageInput ): Message
    updateMessage( id:ID!,input:MessageInput ): Message
  }

`);

module.exports = schema;