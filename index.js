var express= require('express');
var corser = require("corser");
var graphqlHTTP= require('express-graphql');
var { buildSchema } = require('graphql');
var Sequelize = require('sequelize');
var schema=require("./mySchema");
var root=require("./resolvers");
var resolvers=require("./resolvers");

//initialize sequelize
var sequelizeInstance= new Sequelize("sqlite:database.sqlite");

var fakeDatabase={};

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

var app= express();

app.use(corser.create());

app.use('/graphql',graphqlHTTP({
  schema:schema,
  rootValue:root,
  graphiql:true
}))

app.listen(4000);

console.log("running a graphql api server at localhost:4000/graphql")