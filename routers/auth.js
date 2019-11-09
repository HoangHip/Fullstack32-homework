const express = require('express');
const bcrypt = require('bcrypt');
const AuthRouter = express.Router();
const fs = require('fs');

const userController = require('../controllers/user');

// Signin
AuthRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;

    userController.getOne({ username })
        .then(userFound => {
            if (!userFound || !userFound._id) {
                res.json({
                    success: false,
                    error: 'User not exist!',
                });
            } else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    req.session.userInfo = {
                        id: userFound._id,
                        name: userFound.name,
                        username: userFound.username,
                    }

                    res.json({
                        success: true,
                        data: {
                            id: userFound._id,
                            name: userFound.name,
                            username: userFound.username,
                        }
                    })
                } else {
                    res.json({
                        success: false,
                        error: 'Wrong PASSWORD',
                    });
                }
            }
        })
        .catch(error => {
            res.json({
                success: false,
                error,
            });
        })
});

//Check
AuthRouter.get('/check', (req, res) => {
    if (req.session && req.session.userInfo) {
        const { id } = req.session.userInfo;

        userController.getById(id)
            .then(userFound => {
                if (!userFound || !userFound._id) {
                    res.json({
                        success: false,
                        error: 'User not exist!',
                    });
                } else {
                    res.json({
                        success: true,
                        data: {
                            id: userFound._id,
                            name: userFound.name,
                            username: userFound.username,
                        }
                    });
                }
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error,
                });
            })
    } else {
        res.json({
            success: false,
            error: "Un"
        })
    }
})

//Sign out
AuthRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({
        success: true
    });
});


module.exports = AuthRouter;