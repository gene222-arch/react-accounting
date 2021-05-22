import { saveAs } from 'file-saver'

export const generateTransactionExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/transactions?email=${ email }`, 
            'transactions.xlsx'
        );
    } catch (error) {
        return error;
    }
}