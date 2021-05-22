import axiosInstance from '../../utils/axiosInstance'

const fetchDashboardAsync = async (payload = null) => 
{
    const queryParams = payload ? `?dateFrom=${payload.dateFrom}&dateTo=${payload.dateTo}` : '';

    return await axiosInstance()
        .get(`/dashboards/main${queryParams}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default fetchDashboardAsync