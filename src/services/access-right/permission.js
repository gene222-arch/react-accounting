import axiosInstance from '../../utils/axiosInstance'

export const fetchPermissionsAsync = async () => 
{
    return await axiosInstance()
        .get(`/access-rights/permissions`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}