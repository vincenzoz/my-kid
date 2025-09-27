import { createClient } from "@supabase/supabase-js";

const supabaseurl = process.env.SUPABASE_URL;
const supabasekey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseurl, supabasekey);