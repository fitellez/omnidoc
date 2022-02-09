const dbMySQL = require("../../Config/DB");

/**
 * @description get debit card
 */
async function getOne(req, res) {
  const { idDebit } = req.params;
  try {
    var query = `SELECT * FROM debit WHERE id_debit = ? `;
    await dbMySQL.query(query, [idDebit], (error, result) => {
      if (error) {
        res.status(500).json({ message: "Error Query", error: error });
      }
      res.send(result);
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", err: error });
  }
}

/**
 * @description The user withdraw an amount of money from the account
 */
async function withdrawMoney(req, res) {
  const { idDebit, amount } = req.body;

  let currentMoney = await getCurrentMoney(idDebit);

  if (amount <= currentMoney) {
    let newBalance = currentMoney - amount;
    var query = "UPDATE debit set balance = ? WHERE id_debit = ?";
    await dbMySQL.query(query, [newBalance, idDebit], (error, result) => {
      if (error) {
        res.status(500).json({ message: "Error Query", error: error });
      }
      res
        .status(201)
        .send({ message: `Successful money transaction, new balance: $${newBalance}` });
    });
  } else {
    res.status(201).send({
      message: `unsuccessful transaction insufficient money, current balance: $${currentMoney}`,
    });
  }
}

/**
 * @description The client increases his balance
 */
async function increaseMoney(req, res) {
  const { idDebit, amount } = req.body;

  let currentMoney = await getCurrentMoney(idDebit);
  let newBalance = currentMoney + amount;

  var query = "UPDATE debit set balance = ? WHERE id_debit = ?";
  await dbMySQL.query(query, [newBalance, idDebit], (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error Query", error: error });
    }
    res
      .status(201)
      .send({ message: `Successful money transaction, new balance: $${newBalance}` });
  });
}
/**
 * @description Get the current balance of the client
 */
async function getCurrentMoney(idDebit) {
  try {
    return new Promise((resolve, reject) => {
      var query = `SELECT balance FROM debit WHERE id_debit = ? `;
      dbMySQL.query(query, [idDebit], (err, result) => {
        return err ? reject(err) : resolve(result[0].balance);
      });
    });
  } catch (error) {
    console.log("Error has raised: ", error);
  }
}

module.exports = {
  getOne,
  withdrawMoney,
  increaseMoney,
};
