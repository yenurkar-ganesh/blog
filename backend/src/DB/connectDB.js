const { connect } = require("http2");
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database Connected 🌞🍔 \n HOST :: ${connect.connection.host} \n NAME :: ${connect.connection.name} `
    );
  } catch (error) {
    console.log(`Error while Connecting to Database ${error} 😵‍💫`);
    process.exit(1);
  }
};

module.exports = connectToDB;
