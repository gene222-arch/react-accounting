import { saveAs } from 'file-saver'

export const generateVendorExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/vendors?email=${ email }`, 
            'vendors.xlsx'
        );
    } catch (error) {
        return error;
    }
}