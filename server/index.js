import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RouterProduct from "./routers/posts.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/auth.js";
import UserRouters from "./routers/user.js";
import CommentRouter from "./routers/comment.js";
import multer from "multer";
import path from "path";
import Shoe from "./models/PostModel.js";
import RouterCategory from "./routers/categories.js";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình `__dirname` cho ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình CORS để cho phép truy cập từ localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // Thay đổi origin thành địa chỉ client của bạn
    credentials: true,
  })
);

// Cấu hình để phục vụ tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const filePath = `/images/${req.file.filename}`;
    res.status(200).json({ filePath });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi upload ảnh", error });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use("/auth", authRouter);
app.use("/post", RouterProduct);
app.use("/user", UserRouters);
app.use("/comments", CommentRouter);
app.use("/category", RouterCategory);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
