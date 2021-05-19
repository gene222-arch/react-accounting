import axiosInstance from '../../../utils/axiosInstance'

const balanceSheetAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/accounting/balance-sheet`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default balanceSheetAsync