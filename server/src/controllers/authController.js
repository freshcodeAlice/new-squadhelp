const createError = require('http-errors');
const {User} = require('../models');
/* 
{
accessToken: '......',
refreshToken: '.....
}
*/

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
        // 4. Send tokens to user
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