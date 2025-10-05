import {getSchoolCommunications, postSchoolCommunications} from "../../backend/src/services/school.service.js";

export default async function handler(req, res) {
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication");
        try {
            const data = await getSchoolCommunications();
            let mappedCommunications = [];
            mappedCommunications = data.map(communication => {
                let com;
                com = {
                    id: communication.id,
                    title: communication.title,
                    description: communication.description,
                    createdAt: communication.created_at,
                    createdBy: communication.created_by,
                    important: communication.important,
                    read: communication.read
                }
                return com;
            })
            return res.status(200).json({ communications: mappedCommunications });
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

            const mappedDto = {
                id: newSchoolCommunication.id,
                title: newSchoolCommunication.title,
                description: newSchoolCommunication.description,
                createdAt: newSchoolCommunication.created_at,
                createdBy: newSchoolCommunication.created_by,
                important: newSchoolCommunication.important,
                read: newSchoolCommunication.read
            }
            return res.status(201).json(mappedDto);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Server error' })
        }
    }
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}