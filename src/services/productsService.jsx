import { api, requestConfig } from "../utils/config";

const getAllServices = async() => {
    const config = requestConfig("GET");
    
    try {
      const res = await fetch(api + "/services", config)
        .then((res) => res.json())
        .catch((err) => console.log(err));
  
      return res;
    } catch (e) {
      console.log(e);
    }
};

const newProduct = async (data, token) => {
    const config = requestConfig("POST", data, token);
  
    try {
      const res = await fetch(api + "/services", config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (e) {
      console.log(e);
    }
  };

const productsService = {
    getAllServices,
    newProduct
}

export default productsService;