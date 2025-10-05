import { supabase } from "../common/database-client.js";


export async function getSchoolCommunications() {
    console.debug('getSchoolCommunications');
    const { data, error } = await supabase.from('school_communications')
        .select('id, created_at, created_by, title, description, read, important')
        .order('created_at', { ascending: false });
    if(error)
        throw new Error(error.message);
    return data;
}

export async function postSchoolCommunications({title, description, event, eventTitle, eventDate}) {
    const { data, error } = await supabase
        .from('school_communications')
        .insert({ title: title, description: description, event: event, event_title: eventTitle, event_date: eventDate })
        .select()
        .single();
    if (error) throw new Error(error.message)
    return data;
}

export async function getSchoolCommunicationById(id) {
    console.log('id:' + id)
    const { data, error } = await supabase
        .from('school_communications')
        .select()
        .eq('id', id)
        .single();
    if (error) throw new Error(error.message)
    return data;
}
