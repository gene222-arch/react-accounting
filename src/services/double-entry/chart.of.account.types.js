import axiosInstance from '../../utils/axiosInstance'

export const fetchChartOfAccountTypesAsync = async () => 
{
    return await axiosInstance()
        .get('/double-entry/chart-of-account-types')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}