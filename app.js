const newRelic = require("newrelic");
const parseServer = require("parse-server").ParseServer;
const parseDashboard = require("parse-dashboard");
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

/** ================== SERVER CONFIG ================== **/
const DB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const APP_NAME = process.env.APP_NAME;
const APP_ID = process.env.APP_ID;
const FILE_KEY = process.env.FILE_KEY;
const MASTER_KEY = process.env.MASTER_KEY;
const ALLOW_INSECURE_HTTP = true;

/** ================== PARSE SERVER & DASHBOARD ================== **/
const api = new parseServer({
    databaseURI: DB_URL,
    cloud: process.cwd() + "/cloud/main.js",
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: FILE_KEY,
    serverURL: SERVER_URL
});
// Parse Platform Dashboard
const dashboard = new parseDashboard({
    "apps": [
        {
            "serverURL": SERVER_URL,
            "appId": APP_ID,
            "masterKey": MASTER_KEY,
            "appName": APP_NAME
        }
    ],
    "users": [
        {
            "apps": [{"appId": APP_ID}],
            "user": process.env.DASHBOARD_ID,
            "pass": process.env.DASHBOARD_PW
        }
    ],
    "trustProxy": 1
}, ALLOW_INSECURE_HTTP);

/** ================== EXPRESS CONFIG ================== **/
const app = express();
app.use(helmet()); // user helmet for safety
app.disable("x-powered-by"); // disable for safety
app.use(compression()); // gzip
app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); // body parser
app.use(bodyParser.json());
app.locals.newrelic = newRelic; // NewRelic
app.use(favicon(__dirname + "/public/favicon/favicon-32x32.png")); // Favicon From http://www.favicon-generator.org/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** ================== ROUTER ================== **/
app.use("/parse", api);
app.use("/dashboard", dashboard);
app.use("/", require("./routes/main/main.js"));
app.use("/api/data/read", require("./routes/api/kakao"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
