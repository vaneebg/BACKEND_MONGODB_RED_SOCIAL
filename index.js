const express = require("express");
const { dbConnection } = require("./config/config")
const colors = require('colors/safe');
const { typeError } = require('./middlewares/errors');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

app.use(express.json())

dbConnection()
const cors = require('cors')

app.use(cors())
app.use(express.static('./public'));

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));
app.use(typeError)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    });
app.listen(PORT, console.log(colors.rainbow(`Server started on port ${PORT}`)));