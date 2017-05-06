var express= require('express');
var corser= require('corser');
var graphqlHTTP= require('express-graphql');
var { buildSchema } = require('graphql');

//construct a schema, using a graphql schema language
var schema=buildSchema(`
  type RandomDie{
    numSides:Int!
    rollOnce:Int!
    roll(numRolls:Int!):[Int]
  }
  type Query{
    getDie(numSides:Int):RandomDie
  }
`);

//this class implements the RandomDie GraphQL type
class RandomDie{
  constructor(numSides){
    this.numSides=numSides;
  }
  rollOnce(){
    return 1 + Math.floor(Math.random()*this.numSides);
  }
  roll({numRolls}){
    var output=[];
    for( var i=0;i<numRolls;i++ ){
      output.push(this.rollOnce());
    }
    return output;
  }
}

//the root provides the top-level API endpoints
var root={
 getDie:function({numSides}){
   return new RandomDie(numSides||6)
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