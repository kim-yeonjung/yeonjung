const path = require('path');
/** :::::::::::::::::: GLOBAL CONFIG * */
global.appRoot = path.resolve(__dirname);

/** :::::::::::::::::: CONFIG * */
const config = require(`${appRoot}/src/config/config.global`);
if (config.isProduction()) {
	require('newrelic');
}

/** :::::::::::::::::: MODULE * */
const compression = require('compression');
const favicon = require('serve-favicon');
const helhmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const timeout = require('connect-timeout');
const newRelic = require('newrelic');

/** :::::::::::::::::: EXPRESS SETUP * */
const app = express();
app.locals.newrelic = newRelic;
app.use(timeout('5s'));
app.use(compression());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (!config.isProduction()) {
	app.use(logger('dev'));
}

/** :::::::::::::::::: HELMET CONFIG * */
app.use(helhmet());
app.use(helhmet.noCache());
app.use(helhmet.xssFilter());
app.use(helhmet.frameguard({ action: 'sameorigin' }));
app.use(helhmet.noSniff());
app.enable('trust proxy');

/** :::::::::::::::::: VIEW ENGINE SETUP * */
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

/** :::::::::::::::::: ROUTER * */
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', require('./src/routes/main/main.js'));
app.use('/kitchen', require('./src/routes/main/kitchen.js'));
app.use('/api/kitchen/kakao', require('./src/routes/api/kakao'));

/** :::::::::::::::::: ERROR HANDLING * */
app.use(function(req, res, next) {
	return res.status(404).send({ message: `Route${req.url} Not found.` });
});

app.use(function(err, req, res, next) {
	return res.status(500).send({ error: err });
});

module.exports = app;
