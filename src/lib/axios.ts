import axios from "axios";

export const api = axios.create({
     baseURL: "https://fakerapi.it/api/v1/"
});