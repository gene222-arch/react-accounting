import { saveAs } from 'file-saver'

export const generateRevenueExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/revenues?email=${ email }`, 
            'revenues.xlsx'
        );
    } catch (error) {
        return error;
    }
}