const createError = require('http-errors');
const {promisify} = require('utils');
const {User} = require('../models');
const {  ACCESS_TOKEN_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_TIME,
    REFRESH_TOKEN_SECRET} = require('../constants');


const signJWT = promisify(jwt.sign);

module.exports.signIn = async (req, res, next) => {
    try{
        const {body: {email, password}} = req;
        // 1. Find user
        const user = await User.findOne({
        where: {email}
        });
        // 2. Compare passwords
        if(user && user.comparePassword(password)) {
        // 3. Create token pair
       const accessToken = signJWT({
        userId: user.id,
        email: user.email,
        role: user.role
        
       }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_TIME
       });

       const refreshToken = signJWT({}, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_TIME
       });

       user.createRefreshToken({
        value: refreshToken
       });
        // 4. Send tokens to user
       res.send(
        {
            data: {
                user,
                tokens: {
                    access: accessToken,
                    refresh: refreshToken
                }
            }
        }
       )

        } else {
            next(createError(403, 'Invalid credentials'))
        }
    } catch(error) {
        next(error)
    }

};

module.exports.signUp = async (req, res, next) => {
    try {
        const {body} = req;
        const user = await User.create(body);
        if(user) {
                // 3. Create token pair
        // 4. Send tokens to user
        } else {
            next(createError(406, 'Can`t create user'))
        }
    } catch(error) {
        next(error)
    }
}

module.exports.refresh = async (req, res, next) => {
    
}