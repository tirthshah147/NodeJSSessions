const http = require("http");

const server = http.createServer((req,res) => {
  // console.log("Tirth Shah");
  // res.write("Hello world!");
  // res.end();

  if (req.url === "/"){
    res.write("Hello world & Tirth!");
    res.end();
  }

  if (req.url === "/api/courses"){
    res.write(JSON.stringify([1,2,3,4]));
    res.end();
  }
})

server.listen(3000);

console.log("Listening to port 3000.....");



