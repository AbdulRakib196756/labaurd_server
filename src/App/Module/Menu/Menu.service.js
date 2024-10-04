const Menu = require("./Menu.model");

const getallmenu = async (req, res) => {
  try {
    const menu = await Menu.find().lean();
    res.status(200).json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json("get menu error");
  }
};
const createmenu = async (req, res) => {
  try {
    menudata = req.body;
    const menu = await Menu.create(menudata);
    res.status(200).json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json("menu create error");
  }
};

module.exports = {
  getallmenu,
  createmenu,
};
