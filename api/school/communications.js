import {getSchoolCommunications, postSchoolCommunications} from "../../backend/src/services/school.service.js";

export default async function handler(req, res) {
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication");
        try {
            const data = await getSchoolCommunications();
            return res.status(200).json({ communications: data });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    if(req.method === "POST") {
        try {
            console.log("[API] POST - /school/communication");
            const { title, description, event, eventTitle, eventDate } = req.body;
            if (!title || !description) {
                return res.status(400).json({ error: 'Missing title or description' })
            }

            const newSchoolCommunication = await postSchoolCommunications({
                title, description, event, eventTitle, eventDate
            });
            return res.status(201).json(newSchoolCommunication);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Server error' })
        }
    }
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}