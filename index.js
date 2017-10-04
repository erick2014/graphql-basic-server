var express = require('express');
var corser = require("corser");
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Sequelize = require('sequelize');
var schema = require("./schema");

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
	.then( resp => {
		
		var app = express();

		app.use(function(req,res,next){
			req["sequelizeInstance"]=sequelizeInstance;
			next();
		})

		app.use(corser.create());

		app.use('/graphql', graphqlHTTP({
			schema: schema,
			graphiql: true
		}))

		app.listen(port);

		console.log(`running a graphql api server at localhost:${port}/graphql`)
	})
	.catch( err=>{

	})
