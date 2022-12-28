const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function startMongoDb() {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
  }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = startMongoDb;