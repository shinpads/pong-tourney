const express = require('express');
const debug = require('debug');
const bcrypt = require('bcrypt');

// modules
const assertLoggedIn = require('./assertLoggedIn');
const db = require('./database');

const log = debug('pong:dbRouter');
const logError = debug('pong:dbRouter:error');

const dbRouter = express();

dbRouter.post('/user/login', assertLoggedIn, checkLogin);
dbRouter.post('/user/register', register);

async function checkLogin(req, res) {
  log ('POST /dashboard/user/login');
  try {
    const { username, password } = req.body;
    const user = db.get('user', { "username": username });
    if (user.length === 0) {
      return res.send({ success: false });
    }
    const passwordCheck = await bcrypt.compare(password, user[0].password);
    res.send({ success: passwordCheck });
  } catch(err) {
    logError(err);
    res.send({ success: false });
  }
}

async function register(req, res) {
  log('POST /dashboard/user/register');
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hash,
    };
    db.add('user', user);
    await db.save();
    res.send({ success: true });
  } catch(err) {
    logError(err);
    res.send({ success: false });
  }
}

module.exports = dbRouter;
