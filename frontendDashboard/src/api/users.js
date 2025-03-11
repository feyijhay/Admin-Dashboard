// src/api/users.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};