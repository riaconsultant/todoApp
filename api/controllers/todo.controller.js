var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var _ = require('lodash');
var Todo = require('models/Todo');

// get all the todos
router.get('/',function(req,res){
    Todo.find({}, function(err, todos) {
        if (err) throw err;
        res.status(200).send(JSON.stringify(todos));
    });
});

//save new todo task
router.post('/',function(req,res){
    var data = req.body;
    var todo = new Todo(data);
    todo.save(function(err){
        if(err)
            console.log(err);
        //console.log("Todo Created Successfully..")
        res.status(200).send(todo);
    });
});

// get pending/completed task
router.get('/tasks', function (req, res) {
    var param=req.query;
    Todo.find(
        { status: param.status},
        function (err, todo) {
            if (todo) {
                res.status(200).send(JSON.stringify(todo));
            } else {
                var errMsg={};
                errMsg.message="No Record Found.";
                res.status(400).send(JSON.stringify(errMsg));
            }
        });
    });

// update todo by id
router.put('/', function (req, res) {
    var param=req.query;
    var updateData=req.body;
    Todo.findOne(
        { _id: param.id },
        function (err, todo) {
            if (todo) {
                Todo.update(
                    { _id: todo._id },
                    { $set: updateData },
                    function (err, doc) {
                        res.status(200).send(JSON.stringify(doc));
                    });
            } else {
                var doc ={};
                doc.message="Data not found."
                res.status(400).send(JSON.stringify(doc));
            }
        });
    });
// Inactivate the User by id
router.delete('/', function (req, res) {
    var param=req.query;
    Todo.findOne(
        { _id: param.id},
        function (err, todo) {
            if (todo) {
                var set = {status: 3};
                Todo.update(
                    { _id: todo.id},
                    { $set: set },
                    function (err, doc) {
                        res.status(200).send(JSON.stringify(doc));
                    });
            } else {
                var doc ={};
                doc.message="Data not found."
                res.status(400).send(JSON.stringify(doc));
            }
    });
});

module.exports = router;