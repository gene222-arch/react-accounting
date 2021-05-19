import axiosInstance from '../../../utils/axiosInstance'

const taxSummaryAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/accounting/tax-summary`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default taxSummaryAsync