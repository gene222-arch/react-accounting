import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async ({ enabled = false }) => 
{
    const queryParams = !enabled ? '' : `?enabled=${enabled}`;

    return await axiosInstance()
        .get(`/sales/estimate-invoices${queryParams}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/sales/estimate-invoices/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/sales/estimate-invoices', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const convertToInvoiceAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/sales/estimate-invoices/${ payload.id }/to-invoice`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const mailAsync = async (payload) => 
{
    const url = `/sales/estimate-invoices/${ payload.invoice_id }/customers/${ payload.customer_id }/mail`;

    return await axiosInstance()
        .post(url, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const markAsApprovedAsync = async ({ id }) => 
{
    return await axiosInstance()
        .put(`/sales/estimate-invoices/${ id }/mark-as-approved`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const markAsRefusedAsync = async ({ id }) => 
{
    return await axiosInstance()
        .put(`/sales/estimate-invoices/${ id }/mark-as-refused`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/sales/estimate-invoices/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/sales/estimate-invoices', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}