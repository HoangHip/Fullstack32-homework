const bcrypt = require('bcrypt');
const userModel = require('../models/user');

function create(user) {
    const plainPassword = user.password;
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(plainPassword, salt);

    user.password = hashPassword;

    return userModel.create(user);
}

function getList() {
    return userModel.find({});
}

function getById(userId) {
    return userModel.findById(userId);
}

function getOne(query) {
    return userModel.findOne(query);
}

function update(userId, updateData) {
    return userModel.findByIdAndUpdate(userId, updateData);
}

function remove(userId) {
    return userModel.findByIdAndRemove(userId);
}

module.exports = {
    getOne,
    update,
    remove,
    create,
    getList,
    getById,
}