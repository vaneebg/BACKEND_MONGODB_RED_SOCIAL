const express = require("express");
const { dbConnection } = require("./config/config")
const colors = require('colors/safe');
const { typeError } = require('./middlewares/errors');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(typeError)
dbConnection()

app.use(express.static('./public'));

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));


app.listen(PORT, console.log(colors.rainbow(`Server started on port ${PORT}`)));