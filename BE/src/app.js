require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const userRouter = require('./router/user');
const calendarRouter = require('./router/calendar');
const cors = require('cors');

app.use('/uploads', express.static(__dirname + '/uploads'));

require('./DB/db');
app.use(express.json({ limit: "10kb" }), cors());

app.use(userRouter, calendarRouter);


app.listen(PORT, () => {
    console.log(`Server is lstenining on port ${PORT}`);
});