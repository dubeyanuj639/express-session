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
    secret: 'Anuj@junA',
    saveUninitialized: true,
    resave: true,
    rolling: true, // reset expiration on every response
    cookie: { maxAge: 5 * 1000 }, //session Expiration Time 5 seconds
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


app.get('/test1', (req, res) => {
    console.log("this is test1 -->", req.sessionID)
    console.log("your session will expires in seconds ->", req.session.cookie.maxAge / 1000)
    res.end()
})

app.get('/test2', (req, res) => {
    console.log("this is test2 -->", req.sessionID)
    console.log("your session will expires in seconds ->", req.session.cookie.maxAge / 1000)
    res.end()
})
app.get('/test3', (req, res) => {
    console.log("this is test3 -->", req.sessionID)
    console.log("your session will expires in seconds ->", req.session.cookie.maxAge / 1000)
    res.end()
})
app.get('/test4', (req, res) => {
    console.log("this is test4 -->", req.sessionID)
    console.log("your session will expires in seconds ->", req.session.cookie.maxAge / 1000)
    res.end()
})

app.listen(config.server_port, (req, res) => {
    console.log("connected to port 4000")
})

