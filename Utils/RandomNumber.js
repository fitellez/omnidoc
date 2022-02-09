function generateRandomNumber() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}
module.exports = {
  generateRandomNumber,
};
