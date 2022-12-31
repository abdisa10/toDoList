const express = require('express')
const session = require('express-session');

var db = require("./public/db");
const bodyParser = require('body-parser');

var mysql = require('mysql');
const app = express()

const port = 3006
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "task_yes",
    saveUninitialized: true,
    resave: false
}
));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


app.get('/', async function (req, res) {
    res.redirect('/ToDoList.html');
});

app.get('/sortingPriority', async function (req, res) {
    let pageContent = await db.sortPriority();
    res.json({ data: pageContent });
});
app.get('/sortingAlpha', async function (req, res) {
    let pageContent = await db.sortAlpha();
    res.json({ data: pageContent });
});

app.get('/refresh', async function (req, res) {
    let pageContent = await db.refreshPage();
    res.json({ data: pageContent });
});

app.get('/latestTask', async function (req, res) {
    let latestTask = await db.latestTask();
    res.json({ data: latestTask });
});

app.post('/task', async function (req, res) {
    const newTask = req.body.task;
    const newPriority = req.body.priority;
    const completed = 0;
    await db.newTask(newTask, newPriority, completed);
});


app.post('/done', async function (req, res) {
    const id = req.body.id_num;
    const completed = 1;
    await db.doneTask(completed, id);
});
app.post('/notDone', async function (req, res) {
    const id = req.body.id_num;
    const completed = 0;
    await db.notDoneTask(completed, id);
});
app.post('/delete', async function (req, res) {
    const id = req.body.id_num;
    await db.deleteTask(id);
    console.log(await db.refreshPage());
});


