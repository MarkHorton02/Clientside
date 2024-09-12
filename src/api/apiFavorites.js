import axios from "axios";

const favorite = axios.create({
  baseURL: "http://localhost:5001/",
});

export default favorite;
