import axiosInstance from '../../utils/axiosInstance'

export const resendEmailVerificationAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/email/resend', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
