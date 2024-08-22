import Shoe from "../models/PostModel.js";
export const getPosts = async (req, res) => {
  try {
    const posts = await Shoe.find();
    res.status(200).json({
      message: "Product1",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const DetailShoe = async (req, res) => {
  try {
    const posts = await Shoe.findById(req.params.id);
    res.status(200).json({
      message: "Product1",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const createPosts = async (req, res) => {
  try {
    const { image, name, price, brand, size, description } = req.body;

    // Kiểm tra dữ liệu
    if (!image || !name || !price || !brand || !size || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!Array.isArray(size) || !size.every((s) => typeof s === "string")) {
      return res
        .status(400)
        .json({ message: "Size must be an array of strings" });
    }

    // Tạo sản phẩm mới
    const posts = await Shoe.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const updateShoe = req.body;

    const post = new Shoe.findOneAndUpdate(
      { _id: updateShoe._id },
      updateShoe,
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
