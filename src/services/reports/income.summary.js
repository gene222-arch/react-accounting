import axiosInstance from '../../utils/axiosInstance'

const incomeSummaryAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/income-summary`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default incomeSummaryAsync