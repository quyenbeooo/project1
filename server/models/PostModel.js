import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Object,
      required: false,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Đảm bảo rằng danh mục tồn tại
      required: true,
    },
  },
  { timestamps: true }
);

const Shoe = mongoose.model("Shoe", shoeSchema);
export default Shoe;
