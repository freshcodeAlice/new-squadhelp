const JwtService = require('../services/jwtService');


module.exports.checkAccessToken = async (req, res, next) => {
    try{
        const {headers: {authorization}} = req; // 'Bearer kj2hkh23k4jh23k4jh32kjh4kj2332k3j4hk23'
        const [,token] = authorization.split(' ');
        req.tokenData = await JwtService.verifyAccessToken(token);
        next();
    }catch(error){
        next(error)
    }
};

module.exports.checkRefreshToken = async (req, res, next) => {
    try{
        const {body: {refreshToken}} = req; 
        req.tokenData = await JwtService.verifyRefreshToken(refreshToken);
    }catch(error){
        next(error)
    }
};