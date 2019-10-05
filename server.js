const express = require('express');
const bodyParser = require('body-parser');
// const path =require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// router (req, res)
// app.get('/', (request, response) => { //req, res
// response.send("<h1>Hello world!!</h1>");
// console.log(__dirname)
// response.sendFile(__dirname + "/buoi 1/index.html")
// });

// app.get('/style.css', (request, response) => { //req, res
//     // response.send("<h1>Hello world!!</h1>");
//     console.log(__dirname)
//     response.sendFile(__dirname + "/buoi 1/style.css")
// });

//frontend router


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/answer.html');
});

app.get('/ask', (request, response) => {
    response.sendFile(__dirname + '/views/ask.html');
});

app.get('/question', (request, response) => {
    response.sendFile(__dirname + '/views/questionDetail.html');
});



//backend router
app.post('/add-question', (request, response) => {
    console.log(request.body.question);
});


app.use(express.static("views"));

app.listen(6969, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server start success");
    };
});