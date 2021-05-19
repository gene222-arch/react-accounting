import axiosInstance from '../../../utils/axiosInstance'

const trialBalanceAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/accounting/trial-balance`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default trialBalanceAsync