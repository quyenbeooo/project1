type Tcart = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    size: string[];
  };
  qty: number;
};

export default Tcart;
