import Tshoe from "../Type/Tshoe";
import instance from "./index";

const createProduct = async (shoe: Tshoe) => {
  try {
    console.log("Sending data:", shoe);
    const { data } = await instance.post("/post", shoe);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default createProduct;
