//If Message had any complex fields, we'd put them on this object
class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

function rootResolver(userModel) {
  //the root provides the top-level API endpoints
  var root = {

    hello(args, request) {
      let { myName } = args;
      console.log("server ip address...", request.ip)
      return "my name is " + myName;
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

    getUserInfo({ id }) {
      return userModel.findOne({
        "attributes": { exclude: ["createdAt", "updatedAt"] },
        "where": { id: id }
      })
        .then((user) => {
          let userObj = user.get({ plain: true });
          return userObj;
        })
    },

    getMessage({ id }) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
    },

    createMessage({ input }) {
      //create a random id for our "database"
      var id = require('crypto').randomBytes(10).toString('hex');
      fakeDatabase[id] = input;
      return new Message(id, input);
    },

    updateMessage({ id, input }) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      //this replaces all old data, but some apps might want partial update
      fakeDatabase[id] = input;
      return new Message(id, input)
    }

  }
  return root;
}


module.exports = rootResolver;