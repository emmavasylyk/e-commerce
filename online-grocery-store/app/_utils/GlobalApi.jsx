const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
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

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", { username, email, password });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", { identifier: email, password });

const addToCard = (data, jwt) =>
  axiosClient.post("/user-cards", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getCardItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-cards?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cardItemsList = data.map((item, index) => ({
        name: item?.attributes?.products?.data[0]?.attributes?.name,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        image:
          item?.attributes?.products?.data[0]?.attributes?.images?.data[0]
            ?.attributes?.url,
        actualPrice: item?.attributes?.products?.data[0]?.attributes?.price,
        id: item?.id,
        product: item?.attributes?.products?.data[0]?.id,
      }));
      return cardItemsList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete(`/user-cards/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const createOrder = (data, jwt) => {
  return axiosClient.post("/orders", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item, index) => ({
        id: item?.id,
        totalOrderAmount: item?.attributes?.totalOrderAmount,
        paymentId: item?.attributes?.paymentId,
        orderItemList: item?.attributes?.orderItemList,
        createdAt: item?.attributes?.createdAt,
        status: item?.attributes?.status,
      }));

      return orderList;
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCard,
  getCardItems,
  deleteCartItem,
  createOrder,
  getMyOrder,
};
