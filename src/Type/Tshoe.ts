type Tshoe = {
  _id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  size: string[];
  description: string;
  category: {
    category: string;
    name: string;
  };
};
export default Tshoe;
