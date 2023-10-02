const express = require("express");
const apiConfig = require("./api.config");
const db = require("../model/index.js");
const app = express();

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
        res.json({ message: "Welcome to bezkoder application." });
    });

    // set port, listen for requests
    app.listen(apiConfig.PORT, () => {
        console.log(`Server is running on port ${apiConfig.PORT}.`);
    });
}

module.exports = {
    Start: Start()
};
