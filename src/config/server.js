const express = require("express");
const apiConfig = require("./api.config");
const db = require("../models/index.js");
const app = express();
const net = require('net');

// Crie um servidor TCP
const server = net.createServer();

// Função para imprimir a mensagem no console
function logGoal() {
    console.log('Gol definido!');
}

const Start = () => {
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

const StartTCP = () => {
    // Configure o evento 'connection' para o servidor TCP
    server.on('connection', (socket) => {
        console.log('Cliente conectado');

        // Monitorar evento 'data' para receber dados do cliente (você pode modificar esse trecho se necessário)
        socket.on('data', (data) => {
            console.log(`Dados recebidos do cliente: ${data}`);

            // Chame a função de logGoal toda vez que os dados forem recebidos
            logGoal();
        });

        // Monitorar evento 'end' para saber quando o cliente se desconectou (opcional)
        socket.on('end', () => {
            console.log('Cliente desconectado');
        });
    });
  
    // Inicie o servidor na porta especificada
    server.listen(apiConfig.TCP_PORT, apiConfig.TCP_HOST, () => {
        console.log(`Servidor TCP rodando em ${apiConfig.TCP_HOST}:${apiConfig.TCP_PORT}`);
    });
}

module.exports = {
    Start: Start(),
    StartTCP : StartTCP()
};
