const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
const path = require('path');
const fs = require('fs')

const app = express();

app.use(session({
    secret: 'xjnCh40c4cpAn',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 //milisecond
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(express.static(path.join(__dirname, 'views')))

app.use((req, res, next) => {
    console.log(req.sessionID);
    console.log(req.session);
    next();
});

mongoose.connect(
    'mongodb://localhost/hotgirl-32', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.log(err)
        else console.log("DB connect success!");
    }
);

const UserRouter = require('./routers/user');
const PostRouter = require('./routers/post');
const ActiveRouter = require('./routers/active');
const AuthRouter = require('./routers/auth');
const LoginRouter = require('./routers/index');

app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/actives', ActiveRouter);
app.use('/api/auth', AuthRouter);
app.use('/', LoginRouter);

app.listen(6969, (err) => {
    if (err) console.log(err)
    else console.log("Server start success!");
});