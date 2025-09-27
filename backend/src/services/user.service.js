import { supabase } from "../common/database-utils.js";


export async function getUsers() {
    console.debug('getUser');
    const { data, error } = await supabase.from('school_communications').select('*');
    if(error)
        throw new Error(error.message);
    return data;
}

