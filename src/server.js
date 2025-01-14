const { default: mongoose } = require("mongoose");
const app = require(".");
const PORT = 8000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://rakib:rakib196756@cluster0.7lrdivs.mongodb.net/Labgaurd?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`apps running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
