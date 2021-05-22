import { saveAs } from 'file-saver'

export const generatePaymentExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/payments?email=${ email }`, 
            'payments.xlsx'
        );
    } catch (error) {
        return error;
    }
}