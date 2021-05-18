import axiosInstance from '../../utils/axiosInstance'

const incomeVsExpenseSummaryAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/income-vs-expense`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default incomeVsExpenseSummaryAsync