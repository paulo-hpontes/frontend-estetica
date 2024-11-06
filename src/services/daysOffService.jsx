import { api, requestConfig } from "../utils/config";

const getAllDays = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(`${api}/daysoff/`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (e) {
    console.log(e);
  }
};

const newDayOff = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(`${api}/daysoff/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const deleteDayOff = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(`${api}/daysoff/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const daysOffService = {
  getAllDays,
  newDayOff,
  deleteDayOff,
};

export default daysOffService;
