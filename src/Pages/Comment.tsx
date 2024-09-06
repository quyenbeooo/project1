import React, { useState, useEffect } from "react";

type Props = {
  productId: string;
};

const Comment = ({ productId }: Props) => {
  // Load comments for the specific product from local storage
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem(`comments_${productId}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });

  const [newComment, setNewComment] = useState("");

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        username: "Người Dùng Mới",
        date: new Date().toLocaleString(),
        text: newComment,
      };
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      localStorage.setItem(
        `comments_${productId}`,
        JSON.stringify(updatedComments)
      );
      setNewComment("");
    }
  };

  return (
    <>
      <div className="Evaluate_coments flex flex-col items-center text-center w-[100%] gap-10">
        <div className="detail_text font-bold flex w-[65%] gap-5 text-teal-600">
          <span style={{ borderBottom: "1px solid rgb(13, 148, 136)" }}>
            Chi Tiết
          </span>
          <span style={{ borderBottom: "1px solid rgb(13, 148, 136)" }}>
            Bình Luận & Đánh Giá
          </span>
        </div>
        <div className="flex flex-col items-start w-[64%] gap-5">
          <h1 style={{ fontWeight: "bold", float: "left" }}>
            Giày Nike Sportswear Swoosh Tshirt DC5095-010 Màu Đen
          </h1>
          <span className="text-left">
            Áo thun Nike Sportswear Swoosh Tshirt DC5095-010 màu đen là mẫu áo
            thể thao, được kết hợp từ công nghệ cao với những đường nét tinh tế.
            Bên cạnh đó, mẫu áo thun Nike Sportswear Swoosh được làm bằng chất
            liệu vải Cotton Fleece siêu nhẹ và mềm mại, co giãn tốt tạo hiệu ứng
            linh hoạt cho người mặc.
          </span>
        </div>
        <div
          className="w-[65%] bg-gray"
          style={{ height: "800px", background: "#F2F2F2", padding: "20px" }}
        >
          <div>
            <div style={{ fontWeight: "bold", float: "left" }}>
              Đánh Giá Sản Phẩm
            </div>
          </div>
          <br />
          <div
            className="Total_rating flex gap-10"
            style={{ height: "80px", marginLeft: "50px", marginTop: "30px" }}
          >
            <div className="sum_start">
              <div>
                <span style={{ fontSize: "40px", color: "rgb(13, 148, 136)" }}>
                  4.7
                </span>
                <span>trên</span>
                <span>5</span>
              </div>
              <div className="start flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.1l2.39 4.83 5.33.77-3.87 3.77.91 5.31-4.76-2.5-4.76 2.5.91-5.31-3.87-3.77 5.33-.77L12 2.1z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 w-[90%]">
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                5sao
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                4sao
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                3sao
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                2sao
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                1sao
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                Bình Luận
              </div>
              <div className="bg-white border border-black/10 h-8 min-w-[6.25rem] flex items-center justify-center">
                Hình Ảnh
              </div>
            </div>
          </div>
          <div className="comments-section w-[100%] mt-[100px] max-h-[450px] overflow-auto scrollbar-hide">
            <div className="flex flex-col">
              {comments.map((comment, index) => (
                <div key={index} className="container mx-auto p-4">
                  <div className="flex items-center">
                    <div className="w-[72px] h-[72px] rounded-full bg-gray-300 flex items-center justify-center"></div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-6 h-6 text-yellow-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2.1l2.39 4.83 5.33.77-3.87 3.77.91 5.31-4.76-2.5-4.76 2.5.91-5.31-3.87-3.77 5.33-.77L12 2.1z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap w-[55%]">
                        <span className="text-gray-900 font-bold text-lg">
                          {comment.username}
                        </span>
                        <span className="text-gray-500 text-sm mt-[5px]">
                          {comment.date}
                        </span>
                        <span className="text-gray-700 text-sm mt-2 text-left">
                          {comment.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="Input_comment mt-[25px]">
            <div className="Input_button flex gap-5">
              <input
                type="text"
                className="w-[85%] placeholder-custom"
                style={{ height: "50px" }}
                placeholder="Bình Luận..."
                value={newComment}
                onChange={handleChange}
              />
              <button
                className="w-[15%]"
                style={{ background: "rgb(13, 148, 136)" }}
                onClick={handleSubmit}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
