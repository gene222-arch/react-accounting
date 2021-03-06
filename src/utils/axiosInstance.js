import Axios from 'axios'
import * as Cookie from './cookies'

export default (contentType = null) => 
{
    let headers = {};

    if (Cookie.has('access_token')) {
        headers.Authorization = `Bearer ${ Cookie.get('access_token') }`;
    }

    if (contentType) {
        headers.contentType = contentType;
    }

    const axiosInstance = Axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers
    });

    axiosInstance.interceptors.response.use(
        response => Promise.resolve(response),
        error => {
            switch (error.response.status) {
                case 401:
                    Cookie.remove('access_token');

                    alert('Unauthorized access');
                    break;

                case 403:
                    alert('Forbidden');
                    break;

                case 500:
                    alert('Something went wrong in the server');
                    break;            

                default:
                    break;
            }

            return Promise.reject(error);
        }
    )

    return axiosInstance;
}
