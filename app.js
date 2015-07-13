var http = require('http'),
    url = require('url'),
    router = require('./router'),
    NodeSession = require('node-session'),
    session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD  '})

var server = http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'})
    res.end()
    return
  }
  var path = url.parse(req.url).pathname
  var currentRoute = router.match(path)
  if (currentRoute) {
    session.startSession(req, res, function () {
      currentRoute.fn(req, res, currentRoute)
    })
  } else {
    res.end('404, currentRoute not found')
  }
})

server.listen(8675, function (err) {
  if (err) console.log('Arrgh', err)
  console.log('Woot! A server is running on port 8675')
})
