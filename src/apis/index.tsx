import axios from "axios";

const instancs = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-type": "application/json" },
});
export default instancs;
