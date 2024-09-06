import Tshoe from "../Type/Tshoe";
import instancs from ".";
const createProduct = async (shoe: Tshoe) => {
  try {
    console.log("Sending data:", shoe);
    const { data } = await instancs.post("/post", shoe);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export default createProduct;
