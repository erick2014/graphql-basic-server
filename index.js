var express = require('express');
var corser = require("corser");
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Sequelize = require('sequelize');
var schema = require("./mySchema");

const port = process.env.PORT || 6000;

function logginMiddleware(req, res, next) {
  console.log("request ip from middleware...", req.ip);
  next();
}

//initialize sequelize
var sequelizeInstance = new Sequelize("sqlite:database.sqlite", {
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

//pass the User model to the resolvers
var root = require("./resolvers")(sequelizeInstance);

var app = express();

app.use(corser.create());

app.use(logginMiddleware)

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port);

console.log(`running a graphql api server at localhost:${port}/graphql`)