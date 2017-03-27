;(function(){
	angular.module("app", ["ngResource", "ngRoute"])
		.config(configFnct)
		.controller("UsersCtrl", usersCtrl)
		.controller("TodoCtrl", todoCtrl)
		.controller("AddTodoCtrl", addTodoCtrl)
		.controller("UpdateTodoCtrl", updateTodoCtrl)
		.controller("StatTodoCtrl", statTodoCtrl);

	configFnct.$inject = ["$routeProvider"];
	function configFnct($routeProvider) {
		$routeProvider
			.when("/users", {
	            templateUrl: "users.html",
	            controller: "UsersCtrl",
	            controllerAs: "uc"
	        })
	        .when("/todo", {
	            templateUrl: "todo.html",
	            controller: "TodoCtrl",
	            controllerAs: "tc"
	        })
	        .when("/add-todo", {
	            templateUrl: "addTodo.html",
	            controller: "AddTodoCtrl",
	            controllerAs: "atc"
	        })
	        .when("/update-todo/:id", {
	            templateUrl: "updateTodo.html",
	            controller: "UpdateTodoCtrl",
	            controllerAs: "utc"
	        })
	        .when("/todo/stat", {
	            templateUrl: "statTodo.html",
	            controller: "StatTodoCtrl",
	            controllerAs: "stc"
	        });
	};

	usersCtrl.$inject = ["$scope", "$http"];
	function usersCtrl($scope, $http) {
		var sc = this;

		sc.updateFlag = false;
		sc.users = [];
		
		$http.get("/api/users").success(function(data) {
		    sc.users = data;
		});


		sc.addUsers = function(users) {
			$http.post("/api/users", {name: users})
				.then(function(resolve) {
					resolve.data.forEach((name) => {
						sc.users.push(name)
					});
				});
		};

		sc.updateUser = function(user) {
			$http.put("/api/users/" + user._id, user)
				.then(function(resolve) {

					sc.users.find((item, index) => {
						if(item._id == resolve.data._id) {
							item = resolve.data;
							return true;
						}
					});

					user.update = false;
					sc.updateFlag = false;
				});
		};

		sc.updateState = function(user) {
			if(!sc.updateFlag) { 
				user.update = !user.update;
				sc.updateFlag = true;
			}
		};

		sc.deleteUser = function(user) {
			$http.delete("/api/users/" + user._id)
				.then(function(resolve) {
					if(resolve.data.status == "ok") {
						sc.users.find((item, index) => {
							if(item._id == user._id) {
								sc.users.splice(index, 1);
								return true;
							}
						});
					}
				});
		};
	};

	todoCtrl.$inject = ["$scope", "$http", "$location", "$q"];
	function todoCtrl($scope, $http, $location, $q) {
		var sc = this;
		
		sc.searchText = '';
		sc.pagination = {nPerPage: 5, pageNumber: 1, range: [], sort: true};
		sc.todoList = [];
		sc.allTodoCount = 0;
		sc.users = [];

		$http.get("/api/users").success(function(data) {
		    sc.users = data;
		});
		
		sc.searchTodo = function(text) {

			sc.pagination.pageNumber = 1;
			$http({
				url: "/api/todo",
				method: "GET",
				params: {text: text, nPerPage: sc.pagination.nPerPage, pageNumber: i, sort: sc.pagination.sort}
			}).then(function(resolve) {
			    sc.todoList = resolve.data.items;
		    	pagination(sc.pagination, resolve.data.count);
			});
		};

		sc.paginationTodo = function(i) {
			let deferred = $q.defer(); 

			$http({
				url: "/api/todo",
				method: "GET",
				params: {text: sc.searchText, nPerPage: sc.pagination.nPerPage, pageNumber: i, sort: sc.pagination.sort}
			}).then(function(resolve) {
			    sc.todoList = resolve.data.items;
			    deferred.resolve(resolve.data);
			});

			return deferred.promise;
		};

		sc.toggleSort = function() {
			sc.pagination.sort = !sc.pagination.sort;
			sc.paginationTodo(1)
				.then(function(data) {
			    	pagination(sc.pagination, data.count);
				});
		}

		sc.goToUpdate = (todo) => $location.path('/update-todo/'+todo._id)

		sc.toggleUserUpdateState = function(todo) {
			todo.changeMode = !todo.changeMode;
		};

		sc.saveUserUpdateState = function(todo) {
			sc.toggleUserUpdateState(todo);
			todo.user = sc.users.find((item) => {
				if(item._id == todo.userId)
					return item; 
			});
			sc.updateTodo(todo);
		};

		sc.toggleStatus = function(todo) {
			todo.status = !todo.status;
			sc.updateTodo(todo);
		};

		sc.updateTodo = function(todo) {
			$http.put("/api/todo/" + todo._id, todo)
				.then(function(resolve) {
					sc.todoList.find((item, index) => {
						if(item._id == resolve.data._id) {
							item = resolve.data;
							return true;
						}
					});
				});
		};

		sc.deleteTodo = function(todo) {
			$http.delete("/api/todo/" + todo._id)
				.then(function(resolve) {
					if(resolve.data.status == "ok") {
						sc.todoList.find((item, index) => {
							if(item._id == todo._id) {
								sc.todoList.splice(index, 1);
								return true;
							}
						});
					}
				});
		};

		sc.paginationTodo(1)
			.then(function(data) {
		    	pagination(sc.pagination, data.count);
			});
	};

	addTodoCtrl.$inject = ["$scope", "$http", "$location"];
	function addTodoCtrl($scope, $http, $location) {
		var sc = this;
		
		sc.users = [];
		sc.errors = [];
		
		$http.get("/api/users").success(function(data) {
		    sc.users = data;
		});

		sc.addTodo = function(todo) {
			$http.post("/api/todo", todo)
				.then(
					(resolve) => $location.path("/todo"), 
					(resolve) => {
						sc.errors = [];
						resolve.data.errors.forEach((error) => sc.errors.push(error));
					});
		};
	};

	updateTodoCtrl.$inject = ["$scope", "$http", "$location", "$routeParams"];
	function updateTodoCtrl($scope, $http, $location, $routeParams) {
		var sc = this;
		
		sc.users = [];
		sc.todo = {};
		sc.errors = [];
		
		$http.get("/api/users").success(function(data) {
		    sc.users = data;
		});

		$http.get("/api/todo/"+$routeParams.id)
			.then(
				(resolve) => sc.todo = resolve.data,
				(resolve) => {
					sc.errors = [];
					resolve.data.errors.forEach((error) => sc.errors.push(error));
				});

		sc.updateTodo = function(todo) {
			$http.put("/api/todo/"+todo._id, todo)
				.then(
					(resolve) => $location.path("/todo"), 
					(resolve) => {
						sc.errors = [];
						resolve.data.errors.forEach((error) => sc.errors.push(error));
					});
		};
	};

	function pagination(pag, count) {
		pag.range = [];
		if(pag.nPerPage > 0) {
			for(var i=1;i<=Math.ceil(count/pag.nPerPage);i++) {
			  pag.range.push(i);
			}
		}
	}

	statTodoCtrl.$inject = ["$scope", "$http"];
	function statTodoCtrl($scope, $http) {
		let sc = this;
		sc.stats = [];

		$http.get("/api/todo/stat").success(function(data) {
		    sc.stats = data;
		});
	}

})();