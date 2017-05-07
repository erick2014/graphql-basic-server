var express= require('express');
var corser = require("corser");
var graphqlHTTP= require('express-graphql');
var { buildSchema } = require('graphql');

var fakeDatabase={};

//construct a schema, using a graphql schema language
var schema=buildSchema(`

  input MessageInput{
    content:String,
    author:String
  }

  type Message{
    id:ID!
    content:String
    author:String
  }
 
  type Query{
    hello(myName:String):String
    getMessage(id:ID!):Message
  }

  type Mutation{
    createMessage( input:MessageInput ): Message
    updateMessage( id:ID!,input:MessageInput ): Message
  }

`);

//If Message had any complex fields, we'd put them on this object
class Message{
  constructor(id,{content,author}){
    this.id=id;
    this.content=content;
    this.author=author;
  }
}

//Maps username to content
var fakeDatabase={}


//the root provides the top-level API endpoints
var root={
 hello({myName}){
   return "my name is "+myName;
 },
 getMessage({id}){
   if( !fakeDatabase[id] ){
     throw new Error('no message exists with id ' + id);
   }
 },
 createMessage({input}){
   //create a random id for our "database"
   var id=require('crypto').randomBytes(10).toString('hex');
   fakeDatabase[id]=input;
   return new Message(id,input);
 },
 updateMessage({id,input}){
  if( !fakeDatabase[id] ){
    throw new Error('no message exists with id ' + id);
  }
  //this replaces all old data, but some apps might want partial update
  fakeDatabase[id]=input;
  return new Message(id,input)
 }

}

var app= express();

app.use(corser.create());

app.use('/graphql',graphqlHTTP({
  schema:schema,
  rootValue:root,
  graphiql:true
}))

app.listen(4000);

console.log("running a graphql api server at localhost:4000/graphql")