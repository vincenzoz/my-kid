import { getSchoolCommunications } from "../backend/src/services/school.service.js";

export default async function handler(req, res) {
    console.log("get school communication api");
    try {
        const data = await getSchoolCommunications();
        return res.status(200).json({ users: data });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
}