import axios from "axios";

const url = {
    baseUrl: "https://heroku-backend-ems.herokuapp.com/api",
    login: "/login",
    register: "/register",
    department: "/departments",
    employee: "/employees"
};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

instance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (!error.response) {
            window.location.href = "/no-internet"
        }
        else {
            switch(error.response.status) {
                case 401: window.location.href = "/login"; break;
                case 403: window.location.href = "/no-permisson"; break;
                default: break;
            }
        }
        return Promise.reject(error);
    });

const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
}

export default api;