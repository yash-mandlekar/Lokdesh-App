// Setup axios
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://13.232.221.140/",
  // baseURL: "http://192.168.29.153:4000/",
});

export default Axios;
