const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const app = express()
const port = process.env.PORT || 5001;
const route = require('./routes/index');

app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }))

route(app);

// Connect db
db.connect()
//Listen
app.listen(port)