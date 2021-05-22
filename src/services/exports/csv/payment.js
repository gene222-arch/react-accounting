import { saveAs } from 'file-saver'

export const generatePaymentCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/payments?email=${ email }`, 
            'payments.csv'
        );
    } catch (error) {
        return error;
    }
}