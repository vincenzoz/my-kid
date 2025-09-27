import { supabase } from "../common/database-utils.js";


export async function getUsers() {
    console.debug('Getting users');

    const { data, error } = await supabase.from('school_communications').select('*');

    if(error) {
        console.error(error);
    } else {
        console.log('OK');
        console.log(data);
    }


    return data;
}

