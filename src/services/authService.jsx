import { api, requestConfig } from "../utils/config";

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (res._id && !res.errors) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  //   register,
  logout,
  login,
};

export default authService;
