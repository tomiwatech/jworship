var dotenv = require('dotenv');

dotenv.config();

const config = {
    sendGridKey: process.env.SENDGRID_API_KEY
}

module.exports = config;