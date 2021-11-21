import api from "./api";


const list = () => {
    return api.get(api.url.employee).then(res => res.data);
}

const listByDepartment = (id) => {
    return api.get(`${api.url.employee}/depart/${id}`).then(res => res.data);
}

const add = (data) => {
    return api.post(api.url.employee, data).then(res => res.data);
}

const getById = (id) => {
    return api.get(`${api.url.employee}/${id}`).then(res => res.data)
}

const edit = (id, data) => {
    return api.put(`${api.url.employee}/${id}`, data).then(res => res.data)
}

const remove = (id) => {
    return api.delete(`${api.url.employee}/${id}`).then(res => res.data)
}

const employeeService = {
    list,
    listByDepartment,
    add,
    getById,
    edit,
    delete: remove
};

export default employeeService;