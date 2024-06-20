const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const fileName = parsedUrl.path === "/" ? "index.html" : `.${parsedUrl.path}.html`;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      const errFileName = "./404.html";
      fs.readFile(errFileName, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);