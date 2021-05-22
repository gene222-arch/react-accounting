import { saveAs } from 'file-saver'

export const generateItemExcelAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/excel/items?email=${ email }`, 
            'items.xlsx'
        );
    } catch (error) {
        return error;
    }
}
