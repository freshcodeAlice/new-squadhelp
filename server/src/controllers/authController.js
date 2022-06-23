const createError = require('http-errors');
const JwtService = require('../services/jwtService');
const {User, RefreshToken} = require('../models');



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
      const tokenPair = await JwtService.createTokenPair(user);
// 3.1 Check device amount

if ((await user.countRefreshTokens()) >= MAX_DEVICE_AMOUNT) {
    const [oldestToken] = await user.getRefreshTokens({
        order: [('updatedAt', 'ASC')]
    });
    await oldestToken.update({
        value: refreshToken
    })
} else {
    user.createRefreshToken({
        value: refreshToken
       });
}

     
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
        const tokenPair = await JwtService.createTokenPair(user);

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
            next(createError(406, 'Can`t create user'))
        }
    } catch(error) {
        next(error)
    }
}

module.exports.refresh = async (req, res, next) => {
    const {body: {refreshToken}} = req; // надеемся, что refreshToken не сдох еще
    const refreshTokenInstance = await RefreshToken.findOne({
        where: {value: refreshToken}
    });
    const user = await refreshTokenInstance.getUser();

     // 3. Create token pair
     const tokenPair = await JwtService.createTokenPair(user);
                
    await refreshTokenInstance.update({
     value: newRefreshToken
    })
 // 4. Send tokens to user
         res.send(
          {
                            data: {
                                user,
                                tokens: {
                                    access: newAccessToken,
                                    refresh: newRefreshToken
                                }
                            }
                        }
                       )
}