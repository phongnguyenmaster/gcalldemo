
var fs = require('fs');
var https = require('https');

var certificate = fs.readFileSync('/etc/letsencrypt/live/tpcore.vn/cert.pem', 'utf8');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/tpcore.vn/privkey.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};



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

var httpsServer = https.createServer(credentials, app);

//Listen
httpsServer.listen(port)