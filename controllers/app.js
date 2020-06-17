const App = require("../models/app");

exports.add = (req, res) => {
	const app = new App(req.body)
	app.save((err, app) => {
		if(err){
			return res.status(400).json({
				err: "Oho!"
			})
		} res.json({
			name: app.name,
			data: app.data
		})
	})
};

exports.push = (req, res) => {
	App.findOneAndUpdate(
		{userkey: req.body.userkey},
		{$push: {data: [{
			sensor: req.body.sensor,
			value: req.body.value
		}]}},
		{new: true, useFindAndModify: false},
		(err, app) => {
			if(err){
				return res.status(400).json({
					err: "Oho!"
				})
			} res.json({
				name: app.name,
				data: app.data
			})
		}
	)
};

exports.get = (req, res) => {
	App.findOne(
		{userkey: req.params.userkey},
		(err, app) => {
			if(err){
				return res.status(400).json({
					err: "Oho!"
				})
			} res.json({
				name: app.name,
				data: app.data
			})
		}
	)
};