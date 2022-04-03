var express = require('express');
var app = express();

var urlsRouter = require('./routers/urls');
var shortenUrlsRouter = require('./routers/shortenUrls');

app.use(express.json());
app.use('/api/v1/urls', urlsRouter);
app.use('/', shortenUrlsRouter);

app.listen(80, function () {
  console.log('mySqlLite listening on port 80!');
});