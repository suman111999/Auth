const express = require('express');
const { login, signUp, getUser } = require('../controllers/userController');
const { verifyToken } = require('../utils/middleware');

const router = express.Router();

//authentication
//password is encrypted(by bcrypt) and stored during signup
router.post('/signup', signUp);

//check email,compare password(by bcrypt),generate token(called access token) and send to frontend 
router.post('/login', login);

//authorization start,now to acess any route 1st have to verifyToken
router.get('/user', verifyToken, getUser);

//refresh token->as token will be expires in 30s but we can not say customer to login after each 30s so 
//after 30s new token is again internaly generated(called refreshing the token) so after each 30s token is new so more secure.

module.exports = router;