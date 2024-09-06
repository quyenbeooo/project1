import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "UnCategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "UnCategorized",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
