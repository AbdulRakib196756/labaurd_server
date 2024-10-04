const reviewmodel = require("./Review.model");

const getallreview = async (req, res) => {
  try {
    const review = await reviewmodel.find();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};
const creatreview = async (req, res) => {
  try {
    const data = req.body;
    const review = await reviewmodel.create(data);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getallreview,
  creatreview,
};
