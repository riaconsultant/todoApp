(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$location','TodoService','FlashService'];
    function TodoController($location, TodoService,FlashService) {
        var todoCtrl = this;
        todoCtrl.save = save;
        todoCtrl.task = null;
        todoCtrl.data = [];
        todoCtrl.getTask = getTask;
        todoCtrl.taskComplete = taskComplete;
        todoCtrl.editTask = editTask;
        todoCtrl.taskDelete = taskDelete;
        todoCtrl.getAll = getAll;


        initController();

        function initController() {
            // reset login status
            getTask(1);
        }

        function getAll() {
            todoCtrl.dataLoading = true;
            TodoService.GetAll().then(function(todos){
                todoCtrl.data = todos;
            });
        };

        function getTask(status) {
            todoCtrl.dataLoading = true;
            TodoService.GetTask(status).then(function(todos){
                if(todos)
                    todoCtrl.data = todos;
            });
        };
        function taskComplete(todo) {
            todoCtrl.dataLoading = true;
            todo.status = 2;
            TodoService.Update(todo).then(function(todos){
                FlashService.Success('Task completed.', true);
                getTask(1);
            });
        };
        function taskDelete(todo) {
            todoCtrl.dataLoading = true;
            todo.status = 3;
            TodoService.Update(todo).then(function(todos){
                FlashService.Success('Task Deleted.', true);
                getTask(1);
            });
        };
        
        function save() {
            //console.log(todoCtrl.todo);
            todoCtrl.dataLoading = true;
            if(todoCtrl.todo._id && todoCtrl.todo.status === 1){
                TodoService.Update(todoCtrl.todo).then(function(todos){
                    FlashService.Success('Task updated completed.', true);
                    getTask(1);
                });
            }else{
                todoCtrl.todo.status = 1;
                TodoService.Create(todoCtrl.todo).then(function(){
                    FlashService.Success('Task created successfully.', true);
                    getTask(1);
                });
            }
            todoCtrl.todo = null;
        };
        function editTask(todo){
            todoCtrl.todo = todo;
        }
    }

})();
