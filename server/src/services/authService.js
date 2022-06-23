const {User, RefreshToken} = require('../models');
const JwtService = require('../services/jwtService');

module.exports.createSession = async (user) => {
    const tokenPair = await JwtService.createTokenPair(user);

    if ((await user.countRefreshTokens()) >= MAX_DEVICE_AMOUNT) {
        const [oldestToken] = await user.getRefreshTokens({
            order: [('updatedAt', 'ASC')]
        });
        await oldestToken.update({
            value: tokenPair.refresh
        })
    } else {
        user.createRefreshToken({
            value: tokenPair.refresh
           });
    }
    return ({user, tokenPair})
}

module.exports.refreshSession = async (refreshTokenInstance) => {
    const user = refreshTokenInstance.getUser();
    const tokenPair = await JwtService.createTokenPair(user);
    await refreshTokenInstance.update({value: tokenPair.refresh});
    return {user, tokenPair}
}

