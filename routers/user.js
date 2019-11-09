const express = require('express');
const UserRouter = express.Router();

const UserController = require('../controllers/user');

//Create
UserRouter.post('/', (req, res) => {
    const { name, username, password, email } = req.body;
    // const name = req.body.name;
    // const username = req.body.username;
    // const password = req.body.password;
    // const email = req.body.email;

    UserController.create({ name, username, password, email })
        .then(userCreated => {
            res.json({
                success: true,
                data: userCreated
            });
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            });
        });
});

//Read list
UserRouter.get('/', (req, res) => {
    UserController.getList()
        .then(userList => {
            res.json({
                success: true,
                data: userList
            });
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            });
        });
});

//Read one
UserRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    UserController.getById(id)
        .then(userFound => {
            res.json({
                success: true,
                data: userFound
            });
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            });
        });
});

//Update
UserRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, password, email } = req.body;

    UserController.update(id, { name, password, email })
        .then(userUpdated => {
            res.json({
                success: true,
                data: userUpdated
            });
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            });
        });
});

//Delete
UserRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    UserController.remove(id)
        .then(() => {
            res.json({
                success: true
            });
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            });
        });
});

module.exports = UserRouter;