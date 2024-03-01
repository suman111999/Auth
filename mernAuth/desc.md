# SignUp
## client side
* from frontend user put their name,email,mobile,password.

## server side
* check duplicacy of user's mobile number or email id(which ever is gona be use for login). as these should not be already in db.
* hash password using bcryptjs ot bcrypt lib.
now can save all details in db(password will be hashed)


# sign in
## client side
* user put email/mobile number and password in login form.

## server side
* check that email/mobile number avability in db.
* if user is availble then campare(from * login from and already stored in db) password.
* if password matched then user can login.
generate token(digitaly sign the token using id,secret_key,expiry time) using jwt.sign()
* send token using httponly cookie:
* return res.status(200).cookie(String(logedInUser._id), token, {
            path: '/',
            expiresIn: new Date(Date.now() + 1000 * 30),//30ms
            httpOnly: true,// on browser we can't access token programitacly
            sameSite: 'lax'
        }).json({ message: 'loged in successfully', success: true, user })

# Now Authorization start
* backend protected route
* to acess any route 1st have to verifyToken
* router.get('/user', verifyToken, getUser);
* in verifyToken middleware we get cookie from req.headers.cookie
* using jwt varify verify the token and if verified then in req.user=id that was put during jwt sign
* now getUser controler function can access req.user




