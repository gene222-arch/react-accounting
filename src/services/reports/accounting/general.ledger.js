import axiosInstance from '../../../utils/axiosInstance'

const generalLedgerAsync = async () => 
{
    return await axiosInstance()
        .get(`/reports/accounting/general-ledger`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export default generalLedgerAsync