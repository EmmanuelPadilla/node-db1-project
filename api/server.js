const express = require("express");

const db = require("../data/dbConfig.js");

const BudgetRouter = require("../budget-router")

const server = express();

server.use(express.json());

server.use('/api/', BudgetRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;
