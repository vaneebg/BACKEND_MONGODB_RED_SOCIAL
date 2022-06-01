const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config")
app.use(express.json())
dbConnection()
const colors = require('colors/safe');

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.listen(PORT, console.log(colors.rainbow(`Server started on port ${PORT}`)));