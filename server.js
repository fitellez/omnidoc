const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./Documentation/swagger.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ********************* R O U T I N G ********************* //
const client = require("./Routes/Client/Client");
const debit = require("./Routes/Debit/Debit");
const credit = require("./Routes/Credit/Credit");

app.use("/api/client", client);
app.use("/api/debit", debit);
app.use("/api/credit", credit);
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// ********************* R O U T I N G ********************* //

app.get("/", (req, res) => res.status(200).send({ text: "OmniDoc API is alive!" }));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
