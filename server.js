'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const request = require('request');

app.set('port', 8080);
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/' + 'index.html'));
});

app.get('/data', (req, res) => {
    request({url: 'https://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista',
     json: true}, function(err, response, json) {
        if (err) {
          throw err;
        }
        res.json(json);
      });
});


app.listen(app.get('port'));
