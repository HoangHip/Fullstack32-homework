const express = require('express');
const fs = require('fs');
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
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/views/style.css")
});


app.get('/', (request, response) => {
    const fileData = fs.readFileSync("questions.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const randomQuestion = questionList[randomIndex];
    if (randomQuestion) {

        const questionDetailHTML = fs.readFileSync("views/answer.html", "utf-8");
        const htmlWithData = questionDetailHTML
            .replace("question_content", randomQuestion.content)
            .replace("question_index", randomIndex)
            .replace("question_index", randomIndex);

        response.send(htmlWithData);
    } else {
        response.send("Câu hỏi không tồn tại!");
    }
});

app.get('/ask', (request, response) => {
    response.sendFile(__dirname + '/views/ask.html');
});


// params /question/asdaksjdsadjsakdja  = /question/:questionIndex

app.post('/answer/:questionIndex', (request, response) => {
    const fileData = fs.readFileSync("questions.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const question = questionList[request.params.questionIndex];

    if (request.body.answer == "yes") {
        question.yes += 1;
    } else {
        question.no += 1;
    }
    questionList[request.params.questionIndex] = question;
    fs.writeFileSync("questions.json", JSON.stringify(questionList));
    // console.log(request.body)
    response.redirect(`/question/${request.params.questionIndex}`);

})


app.get('/question/:questionIndex', (request, response) => {
    const fileData = fs.readFileSync("questions.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const question = questionList[request.params.questionIndex];

    if (question) {
        const questionDetailHTML = fs.readFileSync("views/questionDetail.html", "utf-8");
        const htmlWithData = questionDetailHTML
            .replace("question_content", question.content)
            .replace("total_vote", question.yes + question.no)
            .replace("vote_yes", question.yes)
            .replace("vote_no", question.no);

        response.send(htmlWithData);
    } else {
        response.send("Câu hỏi không tồn tại!");
    }

});



//backend router
app.post('/add-question', (request, response) => {
    const fileData = fs.readFileSync("questions.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const questionContent = request.body.question;

    questionList.push({
        content: questionContent,
        yes: 0,
        no: 0,
    });
    fs.writeFileSync("questions.json", JSON.stringify(questionList));

    response.redirect(`/question/${questionList.length - 1}`);
});


app.use(express.static("views"));

app.listen(6969, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server start success");
    };
});