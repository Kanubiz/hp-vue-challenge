import axios from 'axios';

const crudcrud = "04383a2b9a124d439c5ac7a3ce6746db"
const url = `https://crudcrud.com/api/${crudcrud}/masks`;

const get = async function () {
    return await axios.get(url);
}

const post = async function (mask) {
    return await axios.post(url, mask);
}

const put = async function (id, mask) {
    return await axios.put(`${url}/${id}`, mask);
}

const del = async function (id) {
    return await axios.delete(`${url}/${id}`);
}

export {
    get,
    post,
    put,
    del
};
