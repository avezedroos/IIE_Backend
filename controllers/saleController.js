const Sale = require("../models/Sale");

// @desc Create Sale
// exports.createSale = async (req, res, next) => {
//   console.log("new sale", req.body)
//   const { clientId } = req.body;

//   try {
//     const sale = await Sale.create(req.body);
//     res.status(201).json({
//       message: "Created",
//       clientId,
//       newID: sale._id
//     });
//   } catch (error) {
//     // 🔥 Duplicate key error
//     if (error.code === 11000) {
//       // 🔍 Check if already exists
//       const existingSale = await Sale.findOne({ clientId });
//       if (existingSale) {
//         return res.status(200).json({
//           message: "Already exists",
//           clientId,
//           serverId: existingSale._id,
//         });
//       }
//     }
//     next(error);
//   }
// };



// @desc Create or Update Sale (Upsert)
exports.createSale = async (req, res, next) => {
  const { clientId } = req.body;

  try {
    if (clientId) {
      const existingSale = await Sale.findOne({ clientId });

      if (existingSale) {
        // 🔥 Update existing sale
        const updatedSale = await Sale.findOneAndUpdate(
          { clientId },
          { ...req.body },
          { new: true }
        );

        return res.status(200).json({
          message: "Updated",
          clientId,
          serverId: updatedSale._id,
        });
      }
    }

    // 🆕 Create new sale
    const newSale = await Sale.create(req.body);

    res.status(201).json({
      message: "Created",
      clientId: newSale.clientId,
      serverId: newSale._id,
    });

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
