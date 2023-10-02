const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    TCP_PORT: process.env.TCP_PORT,
    TCP_HOST: process.env.TCP_HOST
};