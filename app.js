'use strict';

var express    = require('express'),
  app          = express(),
  watson       = require('watson-developer-cloud');


// Bootstrap application settings
require('./config/express')(app);

// For local development, replace username and password
var textToSpeech = watson.text_to_speech({
  url: "https://stream.watsonplatform.net/text-to-speech/api",
  username: "d0c324f8-129e-4880-91e9-80b76b659e05",
  password: "PixbIj4QUyLP",
  version: 'v1'
});
app.get('/api/synthesize', function(req, res, next) {
  var transcript = textToSpeech.synthesize(req.query);
  transcript.on('response', function(response) {
    if (req.query.download) {
      response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
    }
  });
  transcript.on('error', function(error) {
    next(error);
  });
  transcript.pipe(res);
});

// Return the list of voices
// app.get('/api/voices', function(req, res, next) {
//   textToSpeech.voices(function (error, voices) {
//     if (error)
//       next(error);
//     else
//       res.json(voices);
//   });
// });


var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
