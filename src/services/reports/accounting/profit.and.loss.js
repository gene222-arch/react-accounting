import axiosInstance from '../../../utils/axiosInstance'

const profitAndLossAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/accounting/profit-and-loss`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default profitAndLossAsync