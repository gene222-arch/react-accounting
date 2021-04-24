import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get('/double-entry/journal-entries')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/double-entry/journal-entries/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/double-entry/journal-entries', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/double-entry/journal-entries/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/double-entry/journal-entries/', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}