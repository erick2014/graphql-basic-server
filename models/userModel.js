var Sequelize = require('sequelize');

var User={
  firstName:{
    type:Sequelize.STRING,
  },
  lastName:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  }
}

module.exports=User;
  
