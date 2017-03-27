module.exports = {
	parseGetRequest: function(req, res, next) {
		let query = {};

		if(req.query.search) {
			let queryArray = req.query.search.replace(/[^А-Я0-9]+/ig, " ").trim().split(" ");

			if(queryArray.length == 1) {
				query = {$or: [
					{firstname: queryArray[0]},
					{lastname: queryArray[0]},
					{phone: queryArray[0]}
				]};
			}

			if(queryArray.length == 2) {
				query = {$or: [
					{firstname: queryArray[0], lastname: queryArray[1]}, 
					{firstname: queryArray[0], phone: queryArray[1]},
					{firstname: queryArray[1], lastname: queryArray[0]}, 
					{firstname: queryArray[1], phone: queryArray[0]},
					{lastname: queryArray[0], phone: queryArray[1]},
					{lastname: queryArray[1], phone: queryArray[0]}
				]};
			}

			if(queryArray.length == 3) {
				query = {$or: [
					{firstname: queryArray[0], lastname: queryArray[1], phone: queryArray[2]}, 
					{firstname: queryArray[0], lastname: queryArray[2], phone: queryArray[1]},
					{firstname: queryArray[1], lastname: queryArray[2], phone: queryArray[0]},
					{firstname: queryArray[1], lastname: queryArray[0], phone: queryArray[2]}, 
					{firstname: queryArray[2], lastname: queryArray[1], phone: queryArray[0]},
					{firstname: queryArray[2], lastname: queryArray[0], phone: queryArray[1]}
				]};
			}
		}

		req.parsedQuery = query;

		next();
	},

	parseData: function(req, res, next) {
		let error = {
			firstname: true,
			lastname: true,
			phone: true
		};

		if(req.body.firstname && req.body.firstname.length > 3) error.firstname = false;
		if(req.body.lastname && req.body.lastname.length > 3) error.lastname = false;
		if(req.body.phone && (req.body.phone.search(/[^0-9]/ig) == -1) && req.body.phone.length.toString() >= 10) error.phone = false;
		if(req.body.email && !validateEmail(req.body.email)) error.email = true;
	

		if(error.firstname || error.lastname || error.phone || error.email) {
			res.json({errors: error});
		} else {
			let data = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				phone: req.body.phone
			};

			if(req.body.email) data.email = req.body.email;
			if(req.body.skype) data.skype = req.body.skype;

			req.validData = data;
			next();
		}
	}
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}