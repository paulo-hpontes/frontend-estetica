import { api, requestConfig } from "../utils/config";

const newScheduling = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/scheduling", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const getAllScheduling = async () => {
    const config = requestConfig("GET");
  
    try {
      const res = await fetch(api + "/scheduling", config)
        .then((res) => res.json())
        .catch((err) => console.log(err));
  
      return res;
    } catch (e) {
      console.log(e);
    }
  };

const schedulingService = {
  newScheduling,
  getAllScheduling,
};

export default schedulingService;
