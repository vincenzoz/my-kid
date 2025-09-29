import {createClient} from "@supabase/supabase-js";
import {createMockClient} from "./database-mock-client.js";

const supabaseurl = process.env.SUPABASE_URL;
const supabasekey = process.env.SUPABASE_KEY;

let supabase;

if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
    console.log('mock');
    supabase = createMockClient();
} else {
    supabase = createClient(supabaseurl, supabasekey);
}

export {supabase};