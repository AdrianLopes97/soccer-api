const db = require("../models");
const Match = db.matchs;
const Op = db.Sequelize.Op;

// Create and Save a new Match
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Match
    const match = {
        firstTeamId: req.body.firstTeamId,
        secondTeamId: req.body.secondTeamId,
        firstTeamGoals: req.body.firstTeamGoals,
        secondTeamGoals: req.body.secondTeamGoals,
    };
    
    // Save Match in the database
    Match.create(match)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Match."
        });
    });
};

// Retrieve all Matchs from the database.
exports.findAll = (req, res) => {
    Match.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Matchs."
        });
    });
};

// Find a single Match with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Match.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Match with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Match with id=" + id
        });
    });
};

// Update a Match by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Match.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Match was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Match with id=${id}. Maybe Match was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Match with id=" + id
        });
    });
};

// Delete a Match with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Match.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Match was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Match with id=${id}. Maybe Match was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Match with id=" + id
        });
    });
};