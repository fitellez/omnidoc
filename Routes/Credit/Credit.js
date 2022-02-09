const express = require("express");
const ruta = express.Router();
const CreditController = require("../../Controllers/Credit/Credit");

// ***************** C O N T R O L L E R S ***************** //
ruta.get("/:idCredit", (req, res) => CreditController.getOne(req, res));
ruta.put("/withdraw", (req, res) => CreditController.withdrawMoney(req, res));
ruta.put("/pay", (req, res) => CreditController.payCredit(req, res));
// ***************** C O N T R O L L E R S ***************** //

module.exports = ruta;
