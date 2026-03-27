const mongoose = require("mongoose");

// const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  size: String,
  quantity: Number,
  price: Number,
});

const saleSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    mangoVariety: {
      type: String,
      required: true,
      enum: ["Alphonso", "Kesar", "Badami", "Other"],
    },
    sellerName: {
      type: String,
      required: true,
    },

    // ✅ NEW
    items: [itemSchema],

    totalAmount: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto calculate total
saleSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  // next(); // ⚠️ REQUIRED
});

module.exports = mongoose.model("Sale", saleSchema);
