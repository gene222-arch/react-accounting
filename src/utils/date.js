import { format } from 'date-fns'

export const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


export const timeStamp = () => Math. floor(Date. now() / 1000); 

export const today = () => format((new Date(Date.now())), 'yyyy-MM-dd');

export const year = () => (new Date()).getFullYear();