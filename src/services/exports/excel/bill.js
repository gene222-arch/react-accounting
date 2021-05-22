import { saveAs } from 'file-saver'

export const generateBillExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/bills?email=${ email }`, 
            'bills.xlsx'
        );
    } catch (error) {
        return error;
    }
}