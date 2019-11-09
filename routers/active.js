const express = require('express');
const ActiveRouter = express.Router();

const ActiveController = require('../controllers/active');

//Create
ActiveRouter.post('/', (req, res) => {
    const { likes, comments, views } = req.body;

    ActiveController.create({ likes, comments, views })
        .then(activeCreated => {
            res.json({
                success: true,
                data: activeCreated
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
ActiveRouter.get('/', (req, res) => {
    ActiveController.getList()
        .then(activeList => {
            res.json({
                success: true,
                data: activeList
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
ActiveRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    ActiveController.getById(id)
        .then(activeFound => {
            res.json({
                success: true,
                data: activeFound
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
ActiveRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { likes, comments, views } = req.body;

    ActiveController.update(id, { likes, comments, views })
        .then(activeUpdated => {
            res.json({
                success: true,
                data: activeUpdated
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
ActiveRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    ActiveController.remove(id)
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

module.exports = ActiveRouter;