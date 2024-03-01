const { verify } = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const verifyToken = (req, res, next) => {
    //M-1:when sending token in headers(not secure)
    // const headers = req.headers[`authorization`];
    // console.log('headers', headers);
    // const token = headers?.split(" ")[1];
    // console.log(token)
    // console.log('req', req)
    //M-2:using cookie
    const cookies = req.headers.cookie; //key=value format
    console.log('cokkie', cookies)
    const token = cookies?.split("=")[1];
    console.log('token', token)
    //token 
    if (!token) {
        return res.status(400).json({ message: `no token found` })
    }

    // // if token availble then verify token
    verify(String(token), JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'Invalide Token' })
        }
        let reqObj = { id: user.id }
        req.user = reqObj;
    })
    next()
}

module.exports = { verifyToken }