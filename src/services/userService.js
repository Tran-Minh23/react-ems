import api from "./api";

const login = (username, password) => {
    const data = {username, password};
    return api.post(api.url.login, data).then(res => res.data);
}

const register = (username, password) => {
    const data = {username, password};
    return api.post(api.url.register, data).then(res => res.data);
}

const userService = {
    login,
    register,
};

export default userService;