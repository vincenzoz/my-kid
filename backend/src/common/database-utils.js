import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class DbService {

    static async getData(tableName) {
        console.debug('SUPABASE_URL: ' + SUPABASE_URL);
        console.debug('tableName: ' + tableName);
        console.log('Runtime detection:', process.version);

        console.log('before call');
        const {data, error, status} = await supabase.from('school_communications').select('*');

        if (error) {
            console.error('Errore nella query:', error.message);
        } else {
            console.table(data);
        }
        console.log('status', status, 'error', error, 'data', data);

        return data;
    }
}
