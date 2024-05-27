const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => resp.data.data);

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => resp.data.data);

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => resp.data.data);

const getProductsByCategory = (category) =>
  axiosClient
    .get(`/products?populate=*&filters[categories][name]=${category}`)
    .then((resp) => resp.data.data);
// const getProductsByCategory = (category) =>
//   axiosClient
//     .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
//     .then((resp) => resp.data.data);

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
};
