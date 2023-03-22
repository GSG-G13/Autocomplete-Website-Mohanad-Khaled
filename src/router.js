const fs = require("fs");
const path = require("path");
const router = (request, response) => {
  let urlPath = request.url;

  const paths = {
    indexPath: path.join(__dirname, "..", "public", "index.html"),
    stylePath: path.join(__dirname, "..", "public", "style.css"),
    mainJsPath: path.join(__dirname, "..", "public", "main.js"),
    logoPath: path.join(__dirname, "..", "public", "img", "weather.jpeg"),
    jsonPath: path.join(__dirname, "..", "src", "data", "countries.json"),
  };
  const { indexPath, stylePath, mainJsPath, logoPath, jsonPath } = paths;

  const responseHandler = function (fPath, fType) {
    fs.readFile(fPath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(`<h1>Server Error</h1>`);
      }
      response.writeHead(200, { "Content-Type": fType });
      response.end(data);
    });
  };

  if (urlPath === "/") {
    responseHandler(indexPath, "text/html");
  } else if (urlPath === "/style.css") {
    responseHandler(stylePath, "text/css");
  } else if (urlPath === "/main.js") {
    responseHandler(mainJsPath, "text/js");
  } else if (urlPath === "/img/weather.jpeg") {
    responseHandler(logoPath, "image/img");
  } else if (urlPath === "/src/data/countries.json") {
    responseHandler(jsonPath, "application/json");
  } else {
    response.writeHead(400, { "Content-Type": "text/html" });
    response.end(`<h1>Client Error</h1>`);
  }
};

module.exports = router;
