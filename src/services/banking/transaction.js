import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get(`/banking/transactions`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByAccountAsync = async ({ account_id }) => 
{
    return await axiosInstance()
        .get(`/banking/transactions/accounts/${account_id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}