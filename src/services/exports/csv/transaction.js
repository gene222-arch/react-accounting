import { saveAs } from 'file-saver'

export const generateTransactionCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/transactions?email=${ email }`, 
            'transactions.csv'
        );
    } catch (error) {
        return error;
    }
}