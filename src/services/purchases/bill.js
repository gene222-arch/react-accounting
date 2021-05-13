import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get(`/purchases/bills`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/purchases/bills/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/purchases/bills', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const mailAsync = async (payload) => 
{
    const url = `/purchases/bills/${ payload.bill_id }/vendors/${ payload.vendor_id }/mail`;

    return await axiosInstance()
        .post(url, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const markAsPaidAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/purchases/bills/${ payload.bill_id }/mark-as-paid`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const markAsReceivedAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/purchases/bills/${ payload.bill_id }/mark-as-received`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const paymentAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/purchases/bills/${ payload.id }/payment`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/purchases/bills/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const cancelAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/purchases/bills/${ payload.bill_id }/cancel-order`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/purchases/bills', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}