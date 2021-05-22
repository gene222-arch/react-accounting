import { saveAs } from 'file-saver'

export const generateCustomerExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/customers?email=${ email }`, 
            'customers.xlsx'
        );
    } catch (error) {
        return error;
    }
}