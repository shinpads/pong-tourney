const database = require('./database');

async function assertLoggedIn(req, res, next) {
  next();
}

module.exports = assertLoggedIn;
