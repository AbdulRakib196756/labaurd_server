const User = require("./Users.model");

const createuser = async (req, res) => {
  try {
    const userdata = req.body;
    const query = { email: userdata.email };
    const isexist = await User.findOne(query);
    if (isexist) {
      return res.send({ message: "user already exist" });
    }
    const user = await User.create(userdata);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("cart create error");
  }
};
const getalluser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateuserrole = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: "Admin" },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.deleteOne({ _id: id });
    if (!user) {
      res.status(404).json("user not found ");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createuser,
  getalluser,
  deleteuser,
  updateuserrole,
};
