import { saveAs } from 'file-saver'

export const generateCustomerCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/customers?email=${ email }`, 
            'customers.csv'
        );
    } catch (error) {
        return error;
    }
}