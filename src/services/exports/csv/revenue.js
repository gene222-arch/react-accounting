import { saveAs } from 'file-saver'

export const generateRevenueCSVAsync = (email) => 
{
    try {
        saveAs(
            `${ process.env.REACT_APP_API_BASE_URL }/exports/csv/revenues?email=${ email }`, 
            'revenues.csv'
        );
    } catch (error) {
        return error;
    }
}