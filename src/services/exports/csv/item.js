import { saveAs } from 'file-saver'

export const generateItemCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/items?email=${ email }`, 
            'items.csv'
        );
    } catch (error) {
        return error;
    }
}