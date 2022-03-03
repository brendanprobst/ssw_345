const pool = require("../data/config");
const users = [
	{
		id: 1,
		name: "Instructor",
		email: "instructor_345@stevens.edu",
	},
	{
		id: 2,
		name: "TA",
		email: "ta_345@stevens.edu",
	},
];

const router = (app) => {
	app.get(`/`, (req, res) => {
		res.send({
			message: `Yo Node.js and Express REST API`,
		});
	});
	app.get(`/users`, (req, res) => {
		res.send(users);
	});
	app.get(`/handles`, (req, res) => {
		pool.query(`SELECT * FROM Handle`, (error, result) => {
			if (error) throw error;
			res.send(result);
		});
	});
	app.get(`/handles/:handle`, (req, res) => {
		const handle = req.params.handle;
		pool.query(`SELECT * FROM Handle WHERE handle=?`, handle, (e, result) => {
			if (e) throw e;
			res.send(result);
		});
	});
	app.post("/handles", (req, res) => {
		pool.query(`INSERT INTO Handle SET ?`, req.body, (e, result) => {
			if (e) throw e;
			res.status(201).send(`Developer added`);
		});
	});
};

module.exports = router;
