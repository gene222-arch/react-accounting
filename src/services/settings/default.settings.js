import axiosInstance from '../../utils/axiosInstance'

export const findAsync = async () => 
{
    return await axiosInstance()
        .get(`/settings/default-settings`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/settings/default-settings`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
