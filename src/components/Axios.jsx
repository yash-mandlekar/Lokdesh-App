// Setup axios
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.29.153:4000/",
});

export default Axios;
