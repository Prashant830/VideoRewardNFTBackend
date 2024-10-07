const JWT_SECRET = require('../config/config').JWT_SECRET;
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { client } = require('../utils/mongoClient');
const db = client.db('ApniBus'); 
const usersCollection = db.collection('users');



async function getLoginToken(body) {
    try {
        if (!body) {
            throw new AppError('Request body is missing', 401);
        }

        const { username, password } = body;

        const user = await usersCollection.findOne({ username });


        if (username !== user.username || password !== user.password || !user._id) {
            throw new AppError('Invalid credentials', 401);
        }

        console.log("user unique id  + "  + user._id)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('Error in token generation:', err.message); 
        throw new AppError(err.message, 401);
    } 
}

async function saveUser(body) {
    try {
        const { walletaddress , privatekey, username, password  } = body;
        console.log(walletaddress + " " + privatekey + " " + username + " " + password)

        const user = await usersCollection.findOne({ username });

        if (user) {
            throw new AppError('User already exists', 401);
        }

        if(!username && !password  && !walletaddress && !privatekey){
            throw new AppError('Username , Password , walletaddress and privatekey  is required', 401);
        }
 
        if(!walletaddress){
            throw new AppError('walletaddress is required', 401);
        } 

        if(!privatekey){
            throw new AppError('privatekey is required', 401);
        } 

        if(!username){
            throw new AppError('username is required', 401);
        } 

        if(!password){
            throw new AppError('Password is required', 401);
        }
        
       
        // Create new user
        await usersCollection.insertOne({
            username: username,
            password: password,
            walletaddress: walletaddress,
            privatekey: privatekey,
        });
    } catch (error) {
        throw new AppError(error.message, 401);
    }
}

module.exports = { getLoginToken , saveUser };
