const dbMySQL = require("../../Config/DB");

/**
 * @description get credit card
 */
async function getOne(req, res) {
  const { idCredit } = req.params;
  try {
    var query = `SELECT * FROM credit WHERE id_credit = ? `;
    await dbMySQL.query(query, [idCredit], (error, result) => {
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
 * @description The client makes a withdrawal from his credit card, a commission of 5% is made
 */
async function withdrawMoney(req, res) {
  const { idCredit, amount } = req.body;

  let limitMoney = await getLimitMoney(idCredit);
  let currentLimit = limitMoney[0].limit_credit - limitMoney[0].balance;
  let newAmount = amount * 1.05;
  let currentAmount = limitMoney[0].balance + newAmount;

  if (amount <= currentLimit) {
    var query = "UPDATE credit set balance = ? WHERE id_credit = ?";
    await dbMySQL.query(query, [currentAmount, idCredit], (error, result) => {
      if (error) {
        res.status(500).json({ message: "Error Query", error: error });
      }
      res.status(201).send({
        message: `Successful money transaction, new balance: $${currentAmount}`,
      });
    });
  } else {
    res.status(201).send({
      message: `Unsuccessful transaction the amount exceeds the limit of your account, current balance: $${limitMoney[0].balance}`,
    });
  }
}

/**
 * @description The customer makes the payment of his card
 */
async function payCredit(req, res) {
  const { idCredit, amount } = req.body;

  let getAmount = await getLimitMoney(idCredit);
  let currentAmount = getAmount[0].balance - amount;

  if (currentAmount >= 0 && currentAmount <= getAmount[0].balance) {
    var query = "UPDATE credit set balance = ? WHERE id_credit = ?";
    await dbMySQL.query(query, [currentAmount, idCredit], (error, result) => {
      if (error) {
        res.status(500).json({ message: "Error Query", error: error });
      }
      res.status(201).send({
        message: `Pay successful new balance: $${currentAmount}`,
      });
    });
  } else {
    res.status(201).send({
      message: `your payment exceeds your current balance, current balance: $${getAmount[0].balance}`,
    });
  }
}

/**
 * @description get debit card
 */
async function getLimitMoney(idCredit) {
  try {
    return new Promise((resolve, reject) => {
      var query = `SELECT limit_credit, balance FROM credit WHERE id_credit = ? `;
      dbMySQL.query(query, [idCredit], (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  } catch (error) {
    console.log("Error has raised: ", error);
  }
}

module.exports = {
  getOne,
  withdrawMoney,
  payCredit,
};
