const { default: mongoose } = require("mongoose");
const app = require(".");
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(process.env.DATABASEURL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`apps running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
