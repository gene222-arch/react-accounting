import axiosInstance from '../../utils/axiosInstance'

const expenseSummaryAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/expense-summary`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default expenseSummaryAsync