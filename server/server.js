require('babel-polyfill');
const debug = require('debug');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');

const log = debug('pong:sever');

const gssDoc = new GoogleSpreadsheet('12i_sptiBNC4ESZ2h_yDX6e1s1q2Ufq49zc8RpSw5OpE');
let sheet;
gssDoc.getInfo((err, info) => {
  if (err) log('err loading sheets', err);
  else log('loaded sheet');
  sheet = info.worksheets[0];
});


const app = express();
const html = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));
app.use('/static', express.static(__dirname));
app.enable('trust proxy');

app.get('/data', async (req, res) => {
  log('GET /data');
  let standings;
  let schedule;

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
      res.send({
        standings,
        schedule,
      });
    });
  });

});

app.get('*', (req, res) => {
  log('GET *', req.ip, req.headers.host);
  res.sendFile(html);
});

app.listen(5000, () => {
  log('listening on port 5000');
});
