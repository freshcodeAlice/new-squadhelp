const {Users} = require('../models');
/* 
{
accessToken: '......',
refreshToken: '.....
}
*/

module.exports.signIn = async (req, res, next) => {
const {body: {email, password}} = req;
// 1. Find user
// 2. Compare passwords
// 3. Create token pair
// 4. Send tokens to user

const user = await Users.findOne({
   where: {email}
});


};

module.exports.signUp = async (req, res, next) => {
    
}

module.exports.refresh = async (req, res, next) => {
    
}