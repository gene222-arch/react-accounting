import { saveAs } from 'file-saver'

export const generateVendorCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/vendors?email=${ email }`, 
            'vendors.csv'
        );
    } catch (error) {
        return error;
    }
}