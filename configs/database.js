const mongoose = require("mongoose");

module.exports = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/sale-manage");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
}
