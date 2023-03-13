const {
  getStockByIdService,
  getStockService,
  createStockService,
  updateStockByIdService,
} = require("../services/stock.services");

exports.createStock = async (req, res) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "Stock created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create stock",
      error: error.message,
    });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stocks = await getStockService();
    res.status(200).json({
      status: "success",
      message: "Stock all get successfully",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't find stocks",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Stock find successfully",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get stock",
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateStockByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Stock update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update stock",
      error: error.message,
    });
  }
};
