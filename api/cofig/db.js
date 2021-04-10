const mongoose = require('mongoose')
require('dotenv').config()

const Connect = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://node-user:${process.env.DB_PASS}@satish.f113j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('Database Connected')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
module.exports = Connect
