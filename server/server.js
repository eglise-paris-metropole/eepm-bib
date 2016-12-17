"use strict";

var express = require('express'),
    bodyParser  = require('body-parser'),
    firebase = require('firebase'),
    api = require('./routes/api'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/server/img', express.static(__dirname + '/img'));


//Booklist api
app.get('/server/api/books', api.fetchBooks);
app.get('/server/api/books/:id', api.fetchBook);
app.post('/server/api/books', api.addBook);
app.put('/server/api/books/:id', api.updateBook);
app.delete('/server/api/books/:id', api.deleteBook);


var server = app.listen(3000, function () {
    var host = server.address().address,
        port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
});
