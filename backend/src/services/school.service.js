import { supabase } from "../common/database-client.js";


export async function getSchoolCommunications() {
    console.debug('getSchoolCommunications');
    const { data, error } = await supabase.from('school_communications').select('*');
    if(error)
        throw new Error(error.message);
    return data;
}

export async function postSchoolCommunications({title, description, date}) {
    console.debug('postSchoolCommunications');
    const { data, error } =
        await supabase.from('school_communications')
            .insert({title, description, date})
            .select()
            .single();
    if (error) throw new Error(error.message)
    return data
}

