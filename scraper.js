var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var keyextractor = require("keyword-extractor");
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scrap', function(req, res, next) {
  request(req.query.url, function(err, response, body) {
    var jsonResponse = {
      url: req.query.url,
      host: response.req._headers.host,
      text: 'No description',
      keywords: [],
      image: ''
    }
    var textLength = 250;
    if (err) {
      return res.json(jsonResponse);
    }
    if (response.statusCode > 399) {
      return res.json(jsonResponse);
    }
    var html = cheerio.load(body);
    var title = html('title').text();
    var p = html('p:first-child').text();
    var h1 = html('h1:first-child').text();
    var keywords = '';
    var description = '';
    var image = '';
    var meta = html('meta');
    _.map(meta, function(m) {
      if (m.attribs.property && m.attribs.property.match('description', 'ig')) {
        description = m.attribs.content;
      }
      if (m.attribs.name && m.attribs.name.match('keywords', 'ig')) {
        keywords = m.attribs.content;
      }
      if (m.attribs.property && m.attribs.property.match('image', 'ig')) {
        image = m.attribs.content;
      }
      return m;
    });
    if (image === '') {
      image = html('img:first-child').attr('src');
    }
    var finalText = title.trim() + ' ' + description.trim() + ' ' + h1.trim() + ' ' + p.trim();
    if (keywords === '') {
      keywords = keyextractor.extract(finalText, {
          language: "english",
          remove_digits: true,
          return_changed_case: true,
          remove_duplicates: true
      })
    }
    if (finalText.length > textLength) {
      var splitLoc = finalText.indexOf(' ', textLength);
      if (splitLoc !== -1) {
        jsonResponse.text = finalText.substring(0, splitLoc) + '...';
      } else {
        jsonResponse.text = finalText.substring(0, textLength) + '...';
      }
    } else {
      jsonResponse.text = finalText;
    }
    if (Array.isArray(keywords)) {
      _.map(keywords.slice(0, 5), function(k) {
        if (k.replace(/[^a-zA-Z]/g, "") !== '') {
          jsonResponse.keywords.push(k.trim());
        }
        return k;
      })
    } else {
      _.map(keywords.split(',').slice(0, 5), function(k) {
        jsonResponse.keywords.push(k.trim());
        return k;
      })
    }
    jsonResponse.image = image;
    return res.json(jsonResponse);
  });
});

module.exports = router;
