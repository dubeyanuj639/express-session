const express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const config = require('./config')
mongoose.connect(config.mongo_url, { useNewUrlParser: true });
const app = express()
app.use(cookieParser())
app.use(session({
    secret: '*********',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 20000 }, //session Expiration Time 
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.get('/', (req, res, next) => {
    if (req.session.views) {
        console.log("Session Id =>", req.sessionID)
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    }
    else {
        req.session.views = 1;
        res.send('refresh page')
    }
})

app.listen(config.server_port, (req, res) => {
    console.log("connected to port 4000")
})