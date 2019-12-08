const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database')
const questionModel = require('./database/Question')
const answerModel = require('./database/Answer');

//DataBase

connection
    .authenticate()
    .then(() => {
        console.log("Data Base connection sucessfully!");
    })
    .catch((msgError) => {
        console.log(msgError)
    })

app.set('view engine', 'ejs');

app.use(express.static('public')); 

//Bodyparser
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) =>  {

    questionModel.findAll({ raw: true, order: [
        ['id', 'DESC'] 
    ] }).then((question => { 
        res.render("index", {
            question: question 
        });   
    })); 
});

app.get("/toask", (req, res) => {res.render("toask")});

app.post("/savequestions", (req, res) => { 
    
    var getTitle = req.body.title;
    var getDescription = req.body.description;
    
    questionModel.create({
        title: getTitle, 
        description: getDescription
    }).then(() => {
        res.redirect("/"); 
    });
});


app.get("/question/:id", (req, res) => {
    var getId = req.params.id; 
    questionModel.findOne({ 
        where: {id: getId}, 
    }).then(question => { 
        if(question != undefined) { 
            answerModel.findAll({
                where: {questionId: question.id}, 
                order: [
                    ['id', 'DESC'] 
                ]
            }).then((replies) => {
                res.render("question", {
                    question: question, 
                    replies: replies 
                });
            });                     
        } else { 
            res.redirect("/");
        }
    });
});

//criar a rota do formulario de respostas
app.post("/reply", (req, res) => {
    var getCorps = req.body.corps; 
    var getQuestionId = req.body.id; 
    answerModel.create({
        corps: getCorps, 
        questionId: getQuestionId
    }).then(() => {
        res.redirect("/question/" + getQuestionId) 
    });
});

app.listen(8080, () => {console.log("App running!");});