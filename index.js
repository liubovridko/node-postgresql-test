const express = require('express');

require('dotenv').config();

const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const gamerRouter = require('./routes/gamer.router');

app.use('/api/v1', gamerRouter);

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Server is running on port ${port}`);
});
