const activeModel = require('../models/active');

function create(active) {
    return activeModel.create(active);
}

function getList() {
    return activeModel.find({});
}

function getById(activeId) {
    return activeModel.findById(activeId);
}

module.exports = {
    create,
    getList,
    getById,
}