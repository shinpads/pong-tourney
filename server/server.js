require('babel-polyfill');
require('dotenv').config({ path: '.env.production' });
const debug = require('debug');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const database = require('./database');
const GoogleSpreadsheet = require('google-spreadsheet');
const dbRouter = require('./dbRouter');

const log = debug('pong:sever');

const gssDoc = new GoogleSpreadsheet('12i_sptiBNC4ESZ2h_yDX6e1s1q2Ufq49zc8RpSw5OpE');
let sheet;
gssDoc.getInfo((err, info) => {
  if (err) log('err loading sheets', err);
  sheet = info.worksheets[0];
});

log(process.env.NODE_ENV);

const app = express();
const html = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname));
app.use('*/js',express.static(__dirname));
app.enable('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.get('*', (req, res, next) => {
  const now = new Date();
  log('connection', req.ip, `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  next();
});

app.use('/dashboard', dbRouter);

app.get('/data', async (req, res) => {
  log('GET /data');
  let standings;
  let schedule;
  let playerPictures;
  sheet.getCells({
    'min-row': 3,
    'max-row': 150,
    'min-col': 2,
    'max-col': 6,
    'return-empty': true,
  }, (err, cells) => {
    standings = cells;
    sheet.getCells({
      'min-row': 2,
      'max-row': 20,
      'min-col': 8,
      'max-col': 13,
      'return-empty': true,
    }, (err, cells2) => {
      schedule = cells2;
      sheet.getCells({
        'min-row': 2,
        'max-row': 20,
        'min-col': 16,
        'max-col': 17,
        'return-empty': true,
      }, (err, cells3) => {
        playerPictures = cells3;
        res.send({
          standings,
          schedule,
          playerPictures,
        });
      });
    });
  });

});

app.listen(5000, () => {
  log('listening on port 5000');
});
