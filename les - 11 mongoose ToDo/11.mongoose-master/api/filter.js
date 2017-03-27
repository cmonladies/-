module.exports = {
	search: (req, res, next) => {
		let query = {};

		req.mongoParams = {};

		if(req.query.text) {
			let text = req.query.text;

			query = {
				$or: [{title: new RegExp(text, "i")}, {description: new RegExp(text, "i")}]
			};
		}

		req.mongoParams.pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 0;
		req.mongoParams.nPerPage = req.query.nPerPage ? parseInt(req.query.nPerPage) : 0;
		req.mongoParams.sort = req.query.sort == "true" ? 1 : -1;

		console.log(req.mongoParams);
		req.mongoParams.query = query;
		next();
	},

	parseData: (req, res, next) => {
		let errors = [];

		if(!req.body.title || req.body.title.length < 3) errors.push("Укажите поле заголовок, поле заголовок должно быть не менее 3 символов!");

		if(errors.length == 0) {
			next();
		} else {
			res.status(400).json({errors});
		}
	}
}