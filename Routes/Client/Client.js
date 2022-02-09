const express = require("express");
const ruta = express.Router();
const ClientController = require("../../Controllers/Client/Client");

// ***************** C O N T R O L L E R S ***************** //
ruta.get("/:id", (req, res) => ClientController.getOne(req, res));
ruta.post("/register", (req, res) => ClientController.saveClient(req, res));
// ***************** C O N T R O L L E R S ***************** //

module.exports = ruta;
