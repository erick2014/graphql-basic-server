var Sequelize = require('sequelize');

var Client = {
	avatar: {
		type: Sequelize.STRING,
	},
	name: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	}
}

module.exports = Client;

