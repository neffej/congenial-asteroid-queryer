const Sequelize = require("sequelize");
require("dotenv").config();
// let sequelize;

// if (process.env.JAWSDB_URL) {
// 	console.log("hi show me this please", process.env.JAWSDB_URL);
// 	sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
	const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
		host: "127.0.0.1",
		dialect: "mysql",
		port: 3306,
		logging: false,
	});
// }

module.exports = sequelize;
