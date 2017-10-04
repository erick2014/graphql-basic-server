var express = require('express');
var corser = require("corser");
var graphqlHTTP = require('express-graphql');
var Sequelize = require('sequelize');
const app = express();
const schema = require("./schema");
const port = process.env.PORT || 4000;

//initialize sequelize
var sequelizeInstance = new Sequelize("sqlite:database.sqlite", {
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

sequelizeInstance
  .authenticate()
  .then(resp => {
    //import resolvers
    const rootResolver = require("./schema/resolvers");
    //pass the sequelize instance through the request object
    app.use((req, res, next) => {
      req["sequelizeInstance"] = sequelizeInstance;
      next();
    })

    app.use(corser.create());

    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: rootResolver,
      graphiql: true
    }))

    app.listen(port);

    console.log(`running a graphql api server at localhost:${port}/graphql`)
  })
  .catch(err => {
    console.log("error ", err);
  })
