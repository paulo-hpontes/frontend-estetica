import { api, requestConfig } from "../utils/config";

const paymentLink = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(`${api}/payment/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const getAllPayment = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(`${api}/payment/`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (e) {
    console.log(e);
  }
};

const deletePayment = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(`${api}/payment/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const paymentService = {
  getAllPayment,
  paymentLink,
  deletePayment,
};

export default paymentService;