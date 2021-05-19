import axiosInstance from '../../utils/axiosInstance'

const reportsDashboardAsync = async () => 
{
    return await axiosInstance()
        .get('/reports')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default reportsDashboardAsync