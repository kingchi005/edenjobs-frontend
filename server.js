const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// Custom server routes
	server.get("/api/data", (req, res) => {
		// Handle your API logic here
		res.json({ message: "Hello from the API!" });
	});

	// Next.js default request handler
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log("Server is running on http://localhost:3000");
	});
});
