import { saveAs } from 'file-saver'

export const generateInvoiceExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/invoices?email=${ email }`, 
            'invoices.xlsx'
        );
    } catch (error) {
        return error;
    }
}