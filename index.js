const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config")
app.use(express.json())
dbConnection()
const colors = require('colors/safe');
const { typeError } = require('./middlewares/errors');


app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.use(typeError)

app.listen(PORT, console.log(colors.rainbow(`Server started on port ${PORT}`)));