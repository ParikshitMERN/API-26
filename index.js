const http = require("http");
const app = require("./src/config/express.config"); //importing express
// const server = http.createServer(app);
app.listen(9005, "127.0.0.1", (err) => {
  if (!err) {
    console.log("Server is running on port 9005");
    console.log("Press CTRL C to disconnect server");
  }
});
