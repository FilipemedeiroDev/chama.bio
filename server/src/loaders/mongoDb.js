const mongoose = require('mongoose');

async function startMongoDb() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});
}

module.exports = startMongoDb;