const User = require('../model/User');

exports.singupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return  user;
}

exports.findUserByEmailService = async (email) => {
    return await User.findOne({email});
}