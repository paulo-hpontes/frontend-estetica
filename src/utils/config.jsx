export const api = 'https://api-estetica-five.vercel.app/api';

export const requestConfig = (method, data, token = null) => {
    let config;

    if(method === 'DELETE' || data === null) {
        config = {
            method,
            headers: {},
        };
    }else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
    };

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};