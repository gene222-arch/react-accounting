import { saveAs } from 'file-saver'

export const generateBillCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/bills?email=${ email }`, 
            'bills.csv'
        );
    } catch (error) {
        return error;
    }
}