const dbMySQL = require("../../Config/DB");
const randomNumber = require("../../Utils/RandomNumber");

/**
 * @description get Client by id
 */
async function getOne(req, res) {
  const { id } = req.params;
  try {
    var query = `SELECT * FROM client WHERE id_client = ? `;
    await dbMySQL.query(query, [id], (error, result) => {
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
 * @description Register the user in the database,
 * generate your debit card and your credit card
 */
async function saveClient(req, res) {
  const { name } = req.body;
  let numberDebitCard = randomNumber.generateRandomNumber();
  let numberCreditCard = randomNumber.generateRandomNumber();

  let generateDebitCard = await saveDebitCard(numberDebitCard);
  let generateCreditCard = await saveCreditCard(numberCreditCard);

  try {
    var query = "INSERT INTO client (name, id_debit, id_credit) VALUES (? , ? , ?)";
    await dbMySQL.query(
      query,
      [name, generateDebitCard, generateCreditCard],
      (error, result) => {
        if (error) {
          res.status(500).json({ message: "Error Query", error: error });
        }
        res.status(201).send({
          message: "Client has been created",
          data: {
            idClient: result.insertId,
            idDebitCard: generateDebitCard,
            idCreditCard: generateCreditCard,
          },
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error", err: error });
  }
}

/**
 * @description Create client's debit card
 */
async function saveDebitCard(numberCardDebit) {
  try {
    return new Promise((resolve, reject) => {
      var query = `INSERT debit SET number_card = ?, balance = 1000 `;
      dbMySQL.query(query, [numberCardDebit], (err, result) => {
        return err ? reject(err) : resolve(result.insertId);
      });
    });
  } catch (error) {
    console.log("Error has raised: ", error);
  }
}

/**
 * @description Create client's credit card
 */
async function saveCreditCard(numberCreditCard) {
  try {
    return new Promise((resolve, reject) => {
      var query = `INSERT credit SET number_card = ?, limit_credit = 1000, balance = 0 `;
      dbMySQL.query(query, [numberCreditCard], (err, result) => {
        return err ? reject(err) : resolve(result.insertId);
      });
    });
  } catch (error) {
    console.log("Error has raised: ", error);
  }
}

module.exports = {
  getOne,
  saveClient,
};
