const express = require("express");
const { get, json } = require("express/lib/response");
const app = express();
app.use(express.json())
const fs = require("fs");
const { request } = require("http");
const jwtSecret = "migracodeocc1"
const jwt = require("jsonwebtoken");
// AUX FUNCTIONS

function saveQuotesToDataBase(arr){
  fs.writeFileSync("quotes.json",JSON.Stringlify(arr, null, 2));
  fs.writeFileSync(databaseFile, text);
}

const usersFile = "users.json"

// FUNCTIONS

function getQuotesFromDatabase() {
  const text = fs.readFileSync("quotes.json");
  return JSON.parse(text);
}

const getQuotes = function (request, response) {
  const quotes = getQuotesFromDatabase();
  response.send(quotes);
};


const getQuoteById = function (request, response){
  const id = Number(request.params.id);
  const quotes = getQuotesFromDatabase();
  const quote = quotes.find(q => q.id === id)
  response.send(quote)
}


function saveQuote(request, response) {
  const newQuote = request.body;
  const quotes = getQuotesFromDatabase();
  const newId = quotes.length + 1;
  newQuote.id = newId;
  quotes.push(newQuote);
  saveQuotesToDatabase(quotes);
}

  response.status(201).send(newQuote);
  const postQuote = function (recuest, response){
  const quote = request.body;
  const quotes = getQuotesFromDatabase();
  quotes.push(quote)
  saveQuotesToDataBase(quotes)
  response.send(quote)
}


function editQuote(request, response) {
  const newQuote = request.body;
  const quoteId = Number(request.params.quoteId);
  const quotes = getQuotesFromDatabase();
  const dbQuote = quotes.find((q) => q.id === quoteId);
  dbQuote.author = newQuote.author;
  dbQuote.quote = newQuote.quote;
  saveQuotesToDatabase(quotes);
  response.status(200).send(dbQuote);
}

function deleteQuote(request, response) {
  const quoteId = Number(request.params.quoteId);
  const quotes = getQuotesFromDatabase().filter((q) => q.id != quoteId);
  saveQuotesToDatabase(quotes);
  response.send();
}

async function signUp(req, res) {
  const users = getUsersFromDataBase()
  const newUser = req.body
  const id = Number(req.params.id)
  newUser.id = users.length
  const sameUser = users.find((u) => u.userName === newUser.userName);
  if (sameUser) {
    res
      .status(400)
      .json({ message: "user with same userName already exists." });
  } else {
    const ids = users.map((u) => u.id);
    newUser.id = users.length;
    const salt = await bcrypt.genSalt(constantNumber);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    users.push(newUser);

    saveUsersToDatabase(users);
    const jwtToken = generateJWT(newUser.id)
    res.status(201).json({ jwtToken: jwtToken, isAuthenticated: true, id: newUser.id, userName: newUser.userName });
  }
}
 

function generateJWT(userId) {
  // payload is just an object which usually contains some information about user but not confidential information such as password.
  const payload = {
    user: {
      id: userId
    }
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

function authenticate(req, res, next) {
  let token = req.header("authorization");


  if (!token) {
    return res.status(403).send({ message: "authorization denied", isAuthenticated: false });
  }

  token = token.split(" ")[1];

  try {
    jwt.verify(token, jwtSecret);

    next();

  } catch (err) {
    res.status(401).send({ message: "Token is not valid", isAuthenticated: false });
  }
};


// MIDDLEWARES
app.get("/quotes", getQuotes);
app.get("/quotes/:id", getQuoteById)
app.post("/quotes", postQuote)

app.post("/signUp", signUp)

const express = require("express");
const { sign } = require("crypto");
const app = express();
app.use(express.json());
app.get("/quotes", getQuotes);
app.post("/quotes", saveQuote);
app.get("/quotes/:Id", getQuoteById);
app.put("/quotes/:Id", editQuote);
app.delete("/quotes/:Id", deleteQuote);

// SERVER
const port = 3006;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
