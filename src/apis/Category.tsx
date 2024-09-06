import Tcategory from "../Type/Tcategory";
import instancs from ".";
const createCategory = async (category: Tcategory) => {
  try {
    console.log("Sending data:", category);
    const { data } = await instancs.post("/category", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default createCategory;
