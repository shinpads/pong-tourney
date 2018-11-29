const debug = require('debug');

const database = require('./database');

const log = debug('pong:assertLoggedIn');

async function assertLoggedIn(req, res, next) {
  next();
}

module.exports = assertLoggedIn;
