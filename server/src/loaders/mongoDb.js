const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function startMongoDb() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});
}

module.exports = startMongoDb;