
// Author: Guilherme Jaccoud <admin@tropicloud.net>
// Author URI: http://tapioca.ws
// Description: Chaordic OnSite sample for Wong Peru
// Version: 0.1.4

var express = require('express');
var bodyParser = require('body-parser');
var data = require('./products.json');
var id = Object.keys(data).length;
var app = express();

app.use(bodyParser.json());
app.use(express.static('./static'));
app.use('/assets', express.static('./bower_components'));

app.route('/api/products')
  .get(function (req, res) {
    res.json(Object.keys(data).map(function (key) {
      return data[key];
    }));
  })
  .post(function (req, res) {
    var record = req.body;
    record.id = ++id;
    data[record.id] = record;
    res.json(record);
  });

app.route('/api/products/:id')
  .get(function (req, res) {
    res.json(data[req.params.id]);
  })
  .put(function (req, res) {
    data[req.params.id] = req.body;
    res.json(req.body);
  })
  .delete(function (req, res) {
    delete data[req.params.id];
    res.json(null);
  })

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(3000)
