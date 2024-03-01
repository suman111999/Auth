const { isEmpty } = require("lodash");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const signUp = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!isEmpty(existingUser)) {
            return res.status(400).json({ message: `User with id ${existingUser._id} already exist`, success: false })
        }
        //need to hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        const addUser = await User.create({
            name, email, password: hashedPassword
        });

        return res.status(201).json({ message: `Signup is successful`, success: true })

    } catch (err) {

        return res.status(400).json({ message: `SignUp failure`, success: false })

    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const logedInUser = await User.findOne({ email });
        if (isEmpty(logedInUser)) {
            return res.status(400).json({ message: `User with email ${email} does not exist`, success: false })
        }
        //comapre password
        const isPasswordSame = await bcrypt.compare(password, logedInUser.password);

        if (!isPasswordSame) {
            return res.status(400).json({ message: `password is incorrect` })
        }
        //user exist and password is same now
        //generate token
        const token = await sign({ id: logedInUser._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        //exclude password while sending to frontend

        const user = {
            _id: logedInUser._id,
            name: logedInUser.name,
            email: logedInUser.email,
            token
        }
        //cookie->key:value,here id is key value is token
        return res.status(200).cookie(String(logedInUser._id), token, {
            path: '/',
            expiresIn: new Date(Date.now() + 1000 * 30),//30ms
            httpOnly: true,// on browser we can't access token programitacly
            sameSite: 'lax'
        }).json({ message: 'loged in successfully', success: true, user })

    } catch (err) {
        return res.status(400).json({ message: `Error while loging for user with email ${email}`, success: false })
    }
};

const getUser = async (req, res) => {
    console.log('r', req)
    const id = req?.user?.id;
    try {
        const user = await User.findById(id, '-password');//exclude password in result
        return res.status(200).json({ user, message: 'Successfully fetched the user details', success: true })
    } catch (err) {
        return res.status(400).json({ message: `Error while fetching user details of id ${id}`, success: false })
    }
}

module.exports = { login, signUp, getUser }