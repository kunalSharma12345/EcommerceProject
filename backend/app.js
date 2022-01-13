const express = require('express');
const app = express();

const errorMiddleware = require("./middleware/error");

const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

// importing routes...
const product = require("./routes/productRoute");
app.use("/api/v1",product);

const user = require('./routes/userRoute');
app.use("/api/v1",user);

const order = require("./routes/orderRoute");
app.use("/api/v1",order);

// Middleware for Errors...
app.use(errorMiddleware);

module.exports = app;