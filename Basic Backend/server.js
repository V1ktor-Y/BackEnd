const express = require("express");
const app = express();
const PORT = 8888;

let data = ["John"];

app.use(express.json());

// CRUD: Create - post, Read - get, Update - put, Delete - delete
// '/' is the home route

app.get("/index.html", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/", (req, res) => {
  console.log("Main", req.method);

  res.send(`
    <body
    style="background:cornflowerblue;
    color:white;">

    <h1>DATA</h1>
    
    <p>${JSON.stringify(data)}</p>

    </body>
    `);
  // 2XX - success
  // 4XX - not success
  // 5XX - serverside error
  //res.sendStatus(200);
});

app.get("/dashboard", (req, res) => {
  console.log("Dashboard", req.method);
  res.send("hi<br>hi2");
});

app.get("/api/data", (req, res) => {
  console.log("Get data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

// Webside endpoints (sends HTML)

// API endpoints (probably sends Json)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
