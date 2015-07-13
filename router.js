var routes = require('routes')(),
    fs = require('fs'),
    qs = require('qs'),
    db = require('monk')('localhost/seating'),
    seats = db.get('seats'),
    users = db.get('users'),
    view = require('./view'),
    mime = require('mime'),
    bcrypt = require('bcryptjs')

routes.addRoute('/', function (req, res, url) {
  var email = req.session.get('email')
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    seats.find({}, function (err, docs) {
      if (err) res.end('no files found')
      var template = view.render('sessions/index', {seats: docs})
      res.end(template)
    })
  }
})
routes.addRoute('/public/*', function (req, res, url) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', mime.lookup(req.url))
    fs.readFile('.' + req.url, function (err, file) {
      if (err) {
        res.setHeader('Content-Type', 'text/html')
        res.end('404')
      }
      res.end(file)
    })
  }
})
module.exports = routes
