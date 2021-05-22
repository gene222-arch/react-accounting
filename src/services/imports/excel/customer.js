import axiosInstance from '../../../utils/axiosInstance'

export const importCustomerAsync = async ({ file }) => 
{
    const formData = new FormData();
    formData.append('file', file);

    return await axiosInstance('multipart/form-data')
        .post('/imports/customers', formData)
        .then(response => response.data)
        .catch(error => Promise.reject(error.reponse.data));
}