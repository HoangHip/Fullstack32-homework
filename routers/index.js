const express = require('express');
const bcrypt = require('bcrypt');
const LoginRouter = express.Router();
const fs = require('fs');

const userController = require('../controllers/user');


LoginRouter.get("/", (req, res) => {
    //display form signin
    if (req.session && req.session.userInfo) {
        const { id } = req.session.userInfo;
        const { name } = req.session.userInfo
        userController.getById(id)
            .then(userFound => {
                if (!userFound || !userFound._id) {
                    res.send("User not exit!!")
                } else {
                    res.send(`<h1 class="text-center">Welcome back ${name}!!</h1>`)
                }
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error,
                });
            })
    } else {
        let signInHTML = fs.readFileSync("views/signin.html", "utf-8");
        res.send(signInHTML);
    }
})

module.exports = LoginRouter;