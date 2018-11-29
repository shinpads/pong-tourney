const express = require('express');
const debug = require('debug');
const bcrypt = require('bcrypt');

// modules
const assertLoggedIn = require('./assertLoggedIn');
const db = require('./database');

const log = debug('pong:dbRouter');
const logError = debug('pong:dbRouter:error');

const dbRouter = express();

dbRouter.post('/user/login', checkLogin);
dbRouter.post('/user/register', checkLogin);

async function checkLogin(req, res) {
  log ('POST /dashboard/login');
  try {
    const { username, password } = req.body;
    const user = db.get('user', { "username": username })[0];
    user.test = 'abc123';
    await db.save();
    log(user);

  } catch(err) {
    logError(err);
    res.send({ success: false });
  }
}

module.exports = dbRouter;
