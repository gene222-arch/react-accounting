import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get(`/sales/revenues`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/sales/revenues/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/sales/revenues', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const mailAsync = async (payload) => 
{
    const url = `/sales/revenues/${ payload.invoice_id }/customers/${ payload.customer_id }/mail`;

    return await axiosInstance()
        .post(url, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const markAsPaidAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/sales/revenues/${ payload.invoice_id }/mark-as-paid`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const paymentAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/sales/revenues/${ payload.id }/payment`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/sales/revenues/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const cancelAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/sales/revenues/${ payload.invoice_id }/cancel-order`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/sales/revenues', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}