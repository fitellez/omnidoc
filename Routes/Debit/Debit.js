const express = require("express");
const ruta = express.Router();
const DebitController = require("../../Controllers/Debit/Debit");

// ***************** C O N T R O L L E R S ***************** //
ruta.get("/:idDebit", (req, res) => DebitController.getOne(req, res));
ruta.put("/withdraw", (req, res) => DebitController.withdrawMoney(req, res));
ruta.put("/increase", (req, res) => DebitController.increaseMoney(req, res));
// ***************** C O N T R O L L E R S ***************** //

module.exports = ruta;
