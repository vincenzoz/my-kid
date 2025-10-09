import {getSchoolCommunications, postSchoolCommunications} from "../../backend/src/services/school.service.js";
import {buildCommunicationDto} from "../../backend/src/common/model-mapper.js";

export default async function handler(req, res) {
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication");
        try {
            const type = req.query.type;
            console.log('type: ' + type);

            if (!type) {
                return res.status(400).json({error: "Invalid communication type"});
            }

            const data = await getSchoolCommunications(type);
            let mappedCommunications = [];
            mappedCommunications =
                data.map(communication => buildCommunicationDto(communication));
            return res.status(200).json({ communications: mappedCommunications });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    if(req.method === "POST") {
        try {
            console.log("[API] POST - /school/communication");
            const { title, description, important, type } = req.body;
            if (!title || !description || !type) {
                return res.status(400).json({ error: 'Missing title or description or type' })
            }
            const newSchoolCommunication = await postSchoolCommunications({
                title, description, important, type
            });
            return res.status(201).json(buildCommunicationDto(newSchoolCommunication));
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Server error' })
        }
    }
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}