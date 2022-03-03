const http = require("http");
const port = 3001;
const server = http.createServer();

server.on("request", (req, res) => {
	console.log(`URL: ${req.url}`);
	res.end("Hello, server!");
});

server.listen(port, (e) => {
	if (e) return console.log(`Error: ${e}`);
	console.log(`Server is listening on port ${port}`);
});
