import Category from "../models/CategoryModel.js";
class CategoryControllers {
  async getAll(req, res) {
    try {
      const data = await Category.find({});

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "No Category found",
        });
      }

      return res.status(200).json({
        message: "Category list fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async getDetail(req, res) {
    try {
      const data = await Category.findById(req.params.id);

      if (!data) {
        return res.status(404).json({
          message: "No Category found",
        });
      }

      return res.status(200).json({
        message: "Category details fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async createCategory(req, res) {
    try {
      const data = await Category.create(req.body);

      return res.status(201).json({
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params; // ID từ URL
      const { name, slug } = req.body; // Dữ liệu từ form
      // Kiểm tra dữ liệu đầu vào
      if (!name || !slug) {
        return res.status(400).json({ message: "Name and slug are required" });
      }

      // Cập nhật tài liệu trong cơ sở dữ liệu
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, slug },
        { new: true, runValidators: true } // Trả về tài liệu cập nhật và chạy xác thực
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      console.error("Error updating category:", error); // In lỗi ra console để kiểm tra
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const data = await Category.findByIdAndDelete(req.params.id);

      if (!data) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      return res.status(200).json({
        message: "Category deleted successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }
}

export default CategoryControllers;
