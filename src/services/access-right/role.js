import axiosInstance from '../../utils/axiosInstance'

export const fetchRolesAsync = async ({ exceptRoleId = null, enabled = null }) => 
{
    let queryParams = '';
    
    queryParams = !exceptRoleId ? '' : `?exceptRoleId=${exceptRoleId}`;
    queryParams = !enabled ? '' : `?enabled=${enabled}`;

    if (exceptRoleId && enabled) {
        queryParams = `?exceptRoleId=${ exceptRoleId }&enabled=${ enabled }`;
    }

    return await axiosInstance()
        .get(`/access-rights/roles${queryParams}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}