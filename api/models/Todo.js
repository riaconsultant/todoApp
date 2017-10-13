var config=require('config.json');
var mongoose = require('mongoose');
mongoose.connect(config.connectionString,{useMongoClient:true});
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    todo:String,
    status:Number
});
var Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;