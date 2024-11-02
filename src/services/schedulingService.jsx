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

const deleteScheduling = async (id, token) => {
    const config = requestConfig("DELETE", null, token);
  
    try {
      const res = await fetch(api + `/scheduling/${id}`, config)
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
  deleteScheduling,
};

export default schedulingService;
