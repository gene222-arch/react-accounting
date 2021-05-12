import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get(`/banking/reconciliations`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/banking/reconciliations/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/banking/reconciliations', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/banking/reconciliations/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/banking/reconciliations', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}