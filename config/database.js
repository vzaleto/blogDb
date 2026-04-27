const {Sequelize} = require('sequelize')
// require('dotenv').config()

console.log("DB CONFIG:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    db: process.env.DB_NAME
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: Number(process.env.DB_PORT),
        logging: false
    }
)

module.exports = sequelize