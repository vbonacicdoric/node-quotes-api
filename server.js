const express = require("express");
const { get, json } = require("express/lib/response");
const app = express();
app.use(express.json())
const fs = require("fs");
const { request } = require("http");

// AUX FUNCTIONS
function getQuotesFromDatabase() {
  const text = fs.readFileSync("quotes.json");
  return JSON.parse(text);
}

function saveQuotesToDataBase(arr){
  fs.writeFileSync("quotes.json",JSON.Stringlify(arr, null, 2));
  fs.writeFileSync(databaseFile, text);
}


// FUNCTIONS

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



// MIDDLEWARES
app.get("/quotes", getQuotes);
app.get("/quotes/:id", getQuoteById)
app.post("/quotes", postQuote)



const express = require("express");
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
