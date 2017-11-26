(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$http'];
    function TodoService($http) {
        var api_url = "http://riaconsultant.in/todoapp/api/todo";
        var service = {};
        service.GetAll = GetAll;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetTask = GetTask;

        return service;

        function GetAll() {
            return $http.get(api_url).then(handleSuccess, handleError);
        }
        function GetTask(status) {
            return $http.get(api_url+'/tasks?status='+status).then(handleSuccess, handleError);
        }
        function Create(todo) {
            return $http.post(api_url, todo).then(handleSuccess, handleError);
        }
        function Update(todo) {
            return $http.put(api_url+'?id=' + todo._id, todo).then(handleSuccess, handleError);
        }
        function Delete(id) {
            return $http.delete(api_url+'?id=' + id).then(handleSuccess, handleError);
        }
        function handleSuccess(res) {
            res.data.success=true;
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error.data };
            };
        }
    }

})();
