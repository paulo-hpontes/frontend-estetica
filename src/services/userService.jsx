import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const updateProfile = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + `users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const getUserDetails = async (id) => {
  const config = requestConfig("GET");
  try {
    const res = await fetch(api + `/users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
