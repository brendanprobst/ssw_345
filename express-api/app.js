const routes = require("./routes/routes");
const express = require("express");

const bodyParser = require("body-parser");
const port = 3002;
const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
routes(app);
const server = app.listen(port, (e) => {
	if (e) console.log(`Error: ${e}`);
	console.log(`Server listening on port ${port}`);
});
