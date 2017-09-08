const UserModel = require("./models/userModel");
const ClientModel = require("./models/clientModel");

function rootResolver(sequelizeInstance) {
  const userModel = sequelizeInstance.define('user', UserModel, { freezeTableName: true });
  const clientModel = sequelizeInstance.define('client', ClientModel, { freezeTableName: true });
  //the root provides the top-level API endpoints
  var root = {

    hello(args, request) {
      let { myName } = args;
      console.log("server ip address...", request.ip)
      return "my name is " + myName;
    },

    Clients() {
      return clientModel.findAll()
        .then(clients => {
          //parse the data
          let newClientsList = clients.map((client) => {
            return client;
          })
          return newClientsList;
        })
    },

    Users() {
      return userModel.findAll()
        .then(users => {
          //parse the data
          let newUsersList = users.map((user) => {
            return user;
          })
          return newUsersList;
        })
    },

    UserInfo({ id }) {
      return userModel.findOne({
        "attributes": { exclude: ["createdAt", "updatedAt"] },
        "where": { id: id }
      })
        .then((user) => {
          let userObj = user.get({ plain: true });
          return userObj;
        })
    },

  }
  return root;
}


module.exports = rootResolver;