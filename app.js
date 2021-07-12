const express = require('express');
const app = express();

// routes
app.use((req, res) => {
	res.status(200).json({
		message: 'Hello world!!!'
	});
});

module.exports = app;