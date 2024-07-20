const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connection = require('./database/connection');
const APP_PORT = process.env.APP_PORT;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initializeServer(server);
  }

  async middlewares(server) {
    console.log('Where the middlewares are?');
    server.use(cors()); // Quando tiver em Produção Habilita os Cors
    server.use(express.json());
    console.log('Ok! The middlewares are here!');
  }

  async database() {
    try {
      console.log("Calling the DB to show if it's alive");
      await connection.authenticate();
    } catch (error) {
      console.log("Damn! Couldn't connect to the DB: ", error);
    }
  }

  async initializeServer(server) {
    server.listen(APP_PORT, () => {
      console.log(`Server running on port ${APP_PORT}. Toc toc come on!`);
    });
  }
}

module.exports = { Server };
