"use strict";

const express = require("express");
const path = require('path');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.listen(4444, function () {

  console.log("Yayın yapılıyor...");

});