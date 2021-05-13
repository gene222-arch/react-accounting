import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get(`/human-resources/payrolls/pay-calendars`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/human-resources/payrolls/pay-calendars/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/human-resources/payrolls/pay-calendars', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/human-resources/payrolls/pay-calendars/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/human-resources/payrolls/pay-calendars', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}