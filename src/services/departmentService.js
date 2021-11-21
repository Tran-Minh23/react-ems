import api from "./api"

const list = () => {
    return api.get(api.url.department).then(res => res.data);
}

const add = (data) => {
    return api.post(api.url.department, data).then(res => res.data);
}

const remove = (id) => {
    return api.delete(`${api.url.department}/${id}`).then(res => res.data)
}

const getById = (id) => {
    return api.get(`${api.url.department}/${id}`).then(res => res.data)
}

const edit = (id, data) => {
    return api.put(`${api.url.department}/${id}`, data).then(res => res.data)
}

const departmentService = {
    list,
    add,
    delete: remove,
    getById,
    edit,
};

export default departmentService;