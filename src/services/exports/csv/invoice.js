import { saveAs } from 'file-saver'

export const generateInvoiceCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/invoices?email=${ email }`, 
            'invoices.csv'
        );
    } catch (error) {
        return error;
    }
}