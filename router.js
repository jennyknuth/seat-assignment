var routes = require('routes')(),
    fs = require('fs'),
    qs = require('qs'),
    db = require('monk')('localhost/travelblog'),
    seats = db.get('seats'),
    users = db.get('users'),
    view = require('./view'),
    mime = require('mime'),
    bcrypt = require('bcryptjs')

routes.addRoute('/', function (req, res, url) {
  var email = req.session.get('email')
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    var template = view.render('index', )
  }
})




module.exports = routes
