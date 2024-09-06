import Category from "../models/CategoryModel.js";
import Shoe from "../models/PostModel.js";
import mongoose from "mongoose";
class ProductController {
  async getPosts(req, res) {
    try {
      const posts = await Shoe.find().populate("categoryId", "name");
      res.status(200).json({
        message: "Product1",
        data: posts,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async DetailShoe(req, res) {
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
  }
  async createPosts(req, res) {
    try {
      // Kiểm tra dữ liệu từ req.body
      console.log("Received data:", req.body);

      const { image, name, price, brand, size, description, category } =
        req.body;

      if (
        !image ||
        !name ||
        !price ||
        !brand ||
        !size ||
        !description ||
        !category
      ) {
        return res.status(400).json({ message: "Thiếu các trường bắt buộc" });
      }

      // Kiểm tra xem category có phải là ObjectId hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ message: "Invalid categoryId" });
      }

      // Tạo sản phẩm mới
      const posts = await Shoe.create({
        name,
        price,
        brand,
        size,
        description,
        image,
        categoryId: category,
      });

      // Cập nhật danh mục
      const updateCategorys = await Category.findByIdAndUpdate(
        category,
        {
          $addToSet: {
            products: posts._id,
          },
        },
        { new: true } // Trả về danh mục đã cập nhật
      );

      if (!updateCategorys) {
        console.error("Update category not successful");
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(201).json({
        message: "Product created successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async updatePosts(req, res) {
    const { id } = req.params;
    const { name, price, image, brand, size, description, categoryId } =
      req.body;

    console.log("Received data:", req.body); // Log dữ liệu nhận được

    // Kiểm tra ID là chuỗi ObjectId hợp lệ
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    try {
      // Lấy sản phẩm hiện tại để tìm categoryId cũ
      const currentProduct = await Shoe.findById(id);
      if (!currentProduct) {
        return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
      }

      const oldCategoryId = currentProduct.categoryId;

      // Cập nhật sản phẩm
      const updatedProduct = await Shoe.findByIdAndUpdate(
        id,
        { name, price, image, brand, size, description, categoryId },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
      }

      // Xóa sản phẩm khỏi danh mục cũ
      if (oldCategoryId) {
        await Category.findByIdAndUpdate(
          oldCategoryId,
          { $pull: { products: id } },
          { new: true }
        );
      }

      // Thêm sản phẩm vào danh mục mới
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $addToSet: { products: id } },
        { new: true }
      );

      if (!updatedCategory) {
        console.error("Cập nhật danh mục không thành công");
        return res.status(404).json({ message: "Danh mục không tìm thấy" });
      }

      console.log("Updated product:", updatedProduct); // Log sản phẩm đã cập nhật
      console.log("Updated category:", updatedCategory); // Log danh mục đã cập nhật

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  async deteleProduct(req, res) {
    try {
      const post = await Shoe.findByIdAndDelete(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      res.status(200).json({ message: "Sản phẩm được xóa thành công" });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { categoryId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      //Tìm danh mục để đảm bảo nó tồn tại
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      //  Lấy sản phẩm liên quan đến danh mục này
      const products = await Shoe.find({ categoryId });
      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
export default ProductController;
