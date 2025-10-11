import { supabase } from "../common/database-client.js";
import {type} from "@ngrx/signals";


export async function getSchoolCommunications(type) {
    console.debug('getSchoolCommunications. ', type);
    const { data, error } = await supabase.from('school_communications')
        .select('id, created_at, created_by, title, description, read, important')
        .eq('type', type)
        .order('created_at', { ascending: false });
    if(error)
        throw new Error(error.message);
    return data;
}

export async function postSchoolCommunications({title, description, important, type}) {
    const { data, error } = await supabase
        .from('school_communications')
        .insert({ title: title, description: description, important: important, type: type })
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

export async function modifySchoolCommunicationById(id, { title, description, important }) {
    console.log('id:' + id, " - title: " + title, " - description: " + description, " - important: " + important);
    const { data, error } = await supabase
        .from('school_communications')
        .update({ title, description, important })
        .eq('id', id)
        .select()
        .single();
    if (error) throw new Error(error.message)
    return data;
}

export async function deleteSchoolCommunicationById(id) {
    console.log('id:' + id)
    const { data, error } = await supabase
        .from('school_communications')
        .delete()
        .eq('id', id)
        .select()
        .single();
    if (error) throw new Error(error.message)
    return data;
}