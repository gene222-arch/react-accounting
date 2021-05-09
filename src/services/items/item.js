import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async ({ is_for_sale = false, hasStocks = false }) => 
{
    let queryParams = '';

    queryParams = !is_for_sale ? '' : `?isForSale=${is_for_sale}`
    queryParams = !hasStocks ? '' : `?hasStocks=${hasStocks}`;

    if (is_for_sale && hasStocks) {
        queryParams = `?hasStocks=${hasStocks}&is_for_sale=${is_for_sale}`;
    }

    return await axiosInstance()
        .get(`/items/items${queryParams}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findAsync = async ({ id }) => 
{
    return await axiosInstance()
        .get(`/items/items/${id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/items/items', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/items/items/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete('/items/items', {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}