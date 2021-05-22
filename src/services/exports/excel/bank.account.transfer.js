import { saveAs } from 'file-saver'

export const generateTransferExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/bank-account-transfers?email=${ email }`, 
            'bank-account-transfers.xlsx'
        );
    } catch (error) {
        return error;
    }
}