const express = require("express");
const apiConfig = require("./api.config");
const db = require("../models/index.js");
const app = express();

const start = () => {
    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to soccer application." });
    });
    require("../routes/team.routes")(app);
    require("../routes/player.routes")(app);
    require("../routes/match.routes")(app);
    // set port, listen for requests
    app.listen(apiConfig.PORT, () => {
        console.log(`Server is running on port ${apiConfig.PORT}.`);
    });
}
const startSocket = () => {
    const WebSocket = require('ws');
    const server = new WebSocket.Server({ port: apiConfig.TCP_PORT });

    // Configure the 'connection' event for the TCP server
    server.on('connection', (socket) => {
        console.log('client connected');

        socket.on('message', (data) => {
            // Convert the hexadecimal message to a readable string
            const message = data.toString('hex');
            console.log(`encoded received message: ${message}`);

            // Check if the message starts with 0x02 and ends with 0x64
            if (message.startsWith('02') && message.endsWith('64')) {
              // Remove message prefixes and suffixes
              const payload = message.slice(2, -2);
        
              // Convert the payload to a human-readable string
              const decodedPayload = Buffer.from(payload, 'hex').toString('utf8');
        
              console.log(`decoded received message: ${decodedPayload}`);
            }
          });

        // Monitor 'end' event to know when the client disconnected (optional)
        socket.on('end', () => {
            console.log('Cliente desconectado');
        });
    });

    console.log('WebSocket server started');
}


module.exports = {
    Start: start(),
    StartTCP : startSocket()
};