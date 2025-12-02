const mongoose = require("mongoose");

module.exports = async () => {
    try {
      await mongoose.connect("mongodb+srv://vanphu120107_db_user:b6w35IFnkbs41KUJ@sale-mangage.igqhcm8.mongodb.net/sale-manage");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
}
