import axios from "axios";
import Tcomment from "../Type/Tcomment";
// Function to post a comment
const postComment = async (userId, productId, content: Tcomment[]) => {
  try {
    const token = localStorage.getItem("token"); // Hoặc từ cookie tùy thuộc vào cách bạn lưu trữ token
    const response = await axios.post(
      "http://localhost:3000/comments/comment",
      { userId, productId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error posting comment:",
      error.response?.data || error.message
    );
  }
};
export default postComment;
