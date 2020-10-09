const {Sequelize} = require("sequelize")
const {database} = require('../config')

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,{
        host:database.host,
        dialect: "mysql"
    }
)

// const sequelize = new Sequelize("mysql://bb5712fe9d5c1d:f0ed2623@eu-cdbr-west-03.cleardb.net//heroku_bca45002f329ce4?reconnect=true");

module.exports = sequelize;

