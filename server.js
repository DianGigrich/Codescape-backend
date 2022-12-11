const express = require('express');
const routes = require('./routes');

// Import the connection object
const sequelize = require('./config/connection');

const cors = require("cors")

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// Connect to the database before starting the Express.js server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});