const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    console.log("Sales is constructed");
    super();
  }
}

const myEmitter = new Sales();

// an oberver observes a new event called 'newSale'
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Joun");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

//////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("-------------------");
  console.log(req.url);
  console.log("Request received");
  res.end("Render: Request received");
});

server.on("request", (req, res) => {
  console.log("Another Request ☺️");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
