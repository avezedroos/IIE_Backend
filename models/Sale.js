const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  size: String,
  quantity: Number,
  price: Number,
  variety: {
      type: String,
      required: true,
      enum: ["Hapus", "Payri", "Raiwal","Other"],
    },
});

const saleSchema = new mongoose.Schema(

  {
    clientId: {
  type: String,
  unique: true,
},
    customerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
      sellerName: {
      type: String,
      required: true,
    },

    // mangoVariety: {
    //   type: String,
    //   required: true,
    //   enum: ["Hapus", "payri", "raiwal","Other"],
    // },
  

    // ✅ NEW
     paymentMethod: {
      type: String,
      enum: ["Cash", "Online", "Udhar", "Partial Amount"],
      default: "Cash",
    },

    items: [itemSchema],

    totalAmount: {
       type: Number,
      default: 0,
    },

partialAmount: {
      type: Number,
      default: 0,
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
