;(function(){
	angular.module("app", ["ngResource"])
		.controller("notebookCtrl", notebookCtrl);

	notebookCtrl.$inject = ["$scope", "$http"];
	function notebookCtrl($scope, $http) {
		var sc = this;
		sc.updateFlag = false;
		sc.record = {};
		sc.showInput = {};
		sc.formError = {};
		sc.records = [];

		$http.get("/notebook").success(function(data) {
		    sc.records = data;
		});

		sc.toggleShow = function(key) {
			if(key == 'add') {
				sc.showInfo = false;
				sc.showForm = true;
				sc.updateFlag = false;
				sc.record = {};
			} else {
				sc.showInfo = true;
				sc.showForm = false;
			}
		};

		sc.viewRecord = function(record) {
			sc.record = record;
			sc.toggleShow('info');
		};

		sc.searchRecords = function(text) {
			$http({
				url: "/notebook",
				method: "GET",
				params: {search: text}
			}).then(function(resolve) {
			    sc.records = resolve.data;
			});

			sc.updateFlag = false;
		};

		sc.sendRecord = function(record) {
			if(record.email && !sc.showInput.email) delete record.email;
			if(record.skype && !sc.showInput.skype) delete record.skype;

			$http.post("/notebook", record)
				.then(function(resolve) {
					if(resolve.data.errors) {
						sc.formError = resolve.data.errors
					} else {
						sc.records.push(resolve.data);
						sc.record = {};
						sc.formError = {};
					}
				});
		};

		sc.sendUpdateRecord = function(record) {
			if(record.email && !sc.showInput.email) delete record.email;
			if(record.skype && !sc.showInput.skype) delete record.skype;

			$http.put("/notebook/" + record._id, record)
				.then(function(resolve) {

					if(resolve.data.errors) {
						sc.formError = resolve.data.errors
					} else {
						sc.records.find((item, index) => {
							if(item._id == resolve.data._id) {
								item = resolve.data;
								return true;
							}
						});

						sc.record = {};
						sc.formError = {};
						record.update = false;
						sc.updateFlag = false;
					}
				});
		};

		sc.updateState = function(record) {
			sc.toggleShow('add');
			if(!sc.updateFlag) {
				record.update = !record.update;
				sc.record = record;
				if(record.email) sc.showInput.email = true;
				if(record.skype) sc.showInput.skype = true;

				sc.updateFlag = true;
			}
		};

		sc.deleteRecord = function(record) {
			$http.delete("/notebook/" + record._id)
				.then(function(resolve) {
					if(resolve.data.status == "ok") {
						sc.records.find((item, index) => {
							if(item._id == record._id) {
								sc.records.splice(index, 1);
								return true;
							}
						});
					}
				});
		};
	};

})();