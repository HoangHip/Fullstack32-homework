const express = require('express');
const PostRouter = express.Router();

const PostController = require('../controllers/post');
const ActiveController = require('../controllers/active');

//Create
PostRouter.post('/', (req, res) => {
    const { image, title, content, author } = req.body;

    ActiveController.create({}).then(activeCreated => {
        PostController.create({ image, title, content, author, active: activeCreated._id })
            .then(postCreated => {
                res.json({
                    success: true,
                    data: postCreated
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error
                });
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
PostRouter.get('/', (req, res) => {
    PostController.getList()
        .then(postList => {
            res.json({
                success: true,
                data: postList
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
PostRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    PostController.getById(id)
        .then(postFound => {
            res.json({
                success: true,
                data: postFound
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
PostRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { image, title, content, author } = req.body;

    PostController.update(id, { image, title, content, author })
        .then(postUpdated => {
            res.json({
                success: true,
                data: postUpdated
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
PostRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    PostController.remove(id)
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

module.exports = PostRouter;