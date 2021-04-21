import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get('/double-entry/chart-of-account-types')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/double-entry/chart-of-account-types/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/double-entry/chart-of-account-types', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/double-entry/chart-of-account-types/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/double-entry/chart-of-account-types/', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}