const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // problem: reading entire file in memory -> run out of resources -> nodejs crashes
  // solution1(res);

  // Solution 2
  // Solve run out of memory -> use streams
  // problem: Stream Backpressure. receiving speed < reading speed
  // solution2(res);

  // Solution 3
  // Solve Backpressure -> use pipe
  solution3(res);
});

function solution3(res) {
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDestination)
}

function solution2(res) {
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
}

function solution1(res) {
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
}

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
