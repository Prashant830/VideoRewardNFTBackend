require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    JWT_SECRET : process.env.JWT_SECRET,
    MONGO_URL : process.env.MONGO_URL
};