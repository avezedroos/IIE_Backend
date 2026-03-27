const Sale = require("../models/Sale");

// @desc Create Sale
exports.createSale = async (req, res, next) => {
  console.log("new sale",req.body)
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

// @desc Get All Sales
exports.getSales = async (req, res, next) => {
  console.log("getSales hit")
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

// @desc Get Single Sale
exports.getSaleById = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(sale);
  } catch (error) {
    next(error);
  }
};

// @desc Update Sale
exports.updateSale = async (req, res, next) => {
  try {
    const sale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(sale);
  } catch (error) {
    next(error);
  }
};

// @desc Delete Sale
exports.deleteSale = async (req, res, next) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (error) {
    next(error);
  }
};
