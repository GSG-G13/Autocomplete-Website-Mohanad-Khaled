const fs = require("fs");
const path = require("path");
const router = (request, response) => {
  let urlPath = request.url;
  if (urlPath === "/") {
    let filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  } else if (urlPath === "/style.css") {
    let filePath = path.join(__dirname, "..", "public", "style.css");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": "text/css" });
      response.end(data);
    });
  } else if (urlPath === "/main.js") {
    let filePath = path.join(__dirname, "..", "public", "main.js");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": "text/js" });
      response.end(data);
    });
  } else if (urlPath === "/img/weather.jpeg") {
    let filePath = path.join(__dirname, "..", "public", "img", "weather.jpeg");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": "image/img" });
      response.end(data);
    });
  } else if (urlPath === "/src/data/countries.json") {
    let filePath = path.join(__dirname, "..", "src", "data", "countries.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);
    });
  } else {
    response.writeHead(400, { "Content-Type": "text/html" });
    response.end(`<h1>Client Error</h1>`);
  }
};

module.exports = router;
