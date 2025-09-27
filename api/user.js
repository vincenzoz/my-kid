// api/users.js
import { getUsers } from "../backend/src/services/user.service.js";
import {supabase} from "../backend/src/common/database-utils";

export default async function handler(req, res) {
    console.log("get user api");
    try {
        const data = await getUsers();
        return res.status(200).json({ users: data });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
    //
    // const { data, error } = await supabase.from('school_communications').select('*');
    // if(error) {
    //     console.error(error);
    // } else {
    //     console.log(data);
    // }
    // if (error) return res.status(500).json({ error: error.message })
    // return res.status(200).json({ users: data })
}