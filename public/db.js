var mysql = require("mysql");

var table = mysql.createConnection({
    host: "localhost",
    user: "ah10",
    database: "task_yes",
});



function newTask(task, priority, completed) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO tasks (task, priority, completed) VALUES (?, ?, ?);";
        table.query(sql, [task, priority, completed], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.newTask = newTask;

function sortPriority() {
    return new Promise((resolve, reject) => {
        const sql = "select * from tasks order by priority desc;";
        table.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.sortPriority = sortPriority;

function sortAlpha() {
    return new Promise((resolve, reject) => {
        const sql = "select * from tasks order by lower(task) asc;";
        table.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.sortAlpha = sortAlpha;


function doneTask(completed, ids) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE tasks SET completed = ? WHERE ids = ?;";
        table.query(sql, [completed, ids], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.doneTask = doneTask;


function notDoneTask(completed, ids) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE tasks SET completed = ? WHERE ids = ?;";
        table.query(sql, [completed, ids], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.notDoneTask = notDoneTask;



function deleteTask(ids) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM tasks WHERE ids = ?;";
        table.query(sql, [ids], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.deleteTask = deleteTask;


function refreshPage() {
    return new Promise((resolve, reject) => {
        const sql = "select * FROM tasks;";
        table.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.refreshPage = refreshPage;


function latestTask() {
    return new Promise((resolve, reject) => {
        const sql = "select * from tasks where ids = (select MAX(ids) from tasks);";
        table.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
exports.latestTask = latestTask;



