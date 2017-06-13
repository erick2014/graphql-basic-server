var express= require('express');
var corser = require("corser");
var graphqlHTTP= require('express-graphql');
var { buildSchema } = require('graphql');
var Sequelize = require('sequelize');
var schema=require("./mySchema");

var userModel=require("./userModel")

//initialize sequelize
var sequelizeInstance= new Sequelize("sqlite:database.sqlite",{
  define: {
    freezeTableName: true,
  }
});
//define an user model
var User=sequelizeInstance.define('user',userModel,{freezeTableName:true})

//pass the User model to the resolvers
var root=require("./resolvers")(User);

var app= express();

app.use(corser.create());

app.get("/users",function(req,res){

  let users=[
    {"name":"user1","lastName":"garcia"},
    {"name":"juan","lastName":"perez"},
    {"name":"vero","lastName":"garcia"},
    {"name":"ana","lastName":"garcia"},
  ]

  res.json(users);

})

app.use('/graphql',graphqlHTTP({
  schema:schema,
  rootValue:root,
  graphiql:true
}))

app.listen(4000);

console.log("running a graphql api server at localhost:4000/graphql")