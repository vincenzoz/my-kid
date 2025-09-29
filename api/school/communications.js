import { getSchoolCommunications } from "../../backend/src/services/school.service.js";

export default async function handler(req, res) {
    console.log("get school communication api");

    if(req.method === "GET") {
        try {
            const data = await getSchoolCommunications();
            return res.status(200).json({ communications: data });
        } catch (err) {
            res.status(500).json({ error: error.message });
        }
    }

    if(req.method === "POST") {
        try {
            const { title, description, date } = req.body;
            if (!title || !description) {
                return res.status(400).json({ error: 'Missing title or description' })
            }

            const newSchoolCommunication = await getSchoolCommunications(title, description);
            return res.status(201).json({ schoolCommunication: newSchoolCommunication })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Server error' })
        }
    }
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}