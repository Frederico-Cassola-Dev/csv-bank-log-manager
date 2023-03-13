const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
            console.log("==> Connection to DB established <==")
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb;