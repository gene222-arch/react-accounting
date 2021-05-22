import { saveAs } from 'file-saver'

export const generateTransferCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/bank-account-transfers?email=${ email }`, 
            'bank-account-transfers.csv'
        );
    } catch (error) {
        return error;
    }
}