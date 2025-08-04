import axios from "axios";
import { HOST } from "../utils/constants";

const API = axios.create({
    baseURL: HOST,
})


export default API;