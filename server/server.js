const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const html = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));
app.use('/static', express.static(__dirname));

app.get('*', (req, res) => {
  const file = path.join(__dirname, req.params['0']);
  console.log(file);
  res.sendFile(html);
});

app.get('/test', (req, res) => {
  console.log('test 123 baybee');
  res.send('test 123 baybee');
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
