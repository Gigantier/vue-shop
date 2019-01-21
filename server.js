var gigantier = require('@gigantier/js-sdk');

var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());

const apiClient = gigantier.client({
  clientId: 'd35eccde63d9f7ffc669c213f2803ed5',
  clientSecret: '3dc682fd887ebd645a6f883c749a65b3',
  scope: 'Configuration Page Category Banner Product User',
  host: 'fdsapi.ventaspop.com',
  protocol: 'http'
});

app.use(function (req, res, next) {
  
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');

  // Pass to next layer of middleware
  next();
    
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/Configuration', function(req, res) {
  apiClient.call('/Configuration/value').then((data) => {
    res.json(data.values);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.get('/Page', function(req, res) {
  apiClient.call('/Page/menu').then((data) => {
    res.json(data.pages);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.get('/Page/:id', function(req, res) {
  apiClient.call('/Page/list/'+req.params.id).then((data) => {
    res.json(data);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.get('/Category', function(req, res) {
  apiClient.call('/Category/list', { active: 1 }).then((data) => {
    res.json(data.categories);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.post('/User/login', function(req, res) {
  apiClient.authenticate(req.body.email, req.body.pwd).then((data) => {
    delete data.clientId;    
    res.json(data);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.post('/User', function(req, res) {
  apiClient.call('/User', req.body).then((data) => {
    res.json(data);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.get('/Banner', function(req, res) {
  apiClient.call('/Banner/list', { position: req.query.position }).then((data) => {
    res.json(data.banners);
  }).catch((data) => {
    res.status(400).json(data);
  });
});

app.get('/Product', function(req, res) {
  apiClient.call('/Product/list', req.query).then((data) => {
    res.json(data.products);
  }).catch((data) => {
    res.status(400).json(data);
  });
});


app.listen(3500);