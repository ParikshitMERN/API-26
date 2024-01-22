const http = require("http");
const server = http.createServer(
  //server application
  (request, response) => {
    response.end("Hello World");
  }
);

server.listen(9005, "127.0.0.1", (err) => {
  if (!err) {
    console.log("Server is running on port 9005");
    console.log("Press CTRL C to disconnect server");
  }
});
