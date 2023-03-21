const http = require("http");
const PORT = 3000;
const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
