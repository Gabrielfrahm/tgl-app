import {parseISO} from 'date-fns';
export function formatDate(date: string){
    const newDate = parseISO(date);
    return ((newDate.getDate() )) + "/" + ((newDate.getMonth() + 1)) + "/" + newDate.getFullYear(); 
}