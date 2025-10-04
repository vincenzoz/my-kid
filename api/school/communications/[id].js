import {
    getSchoolCommunicationById
} from "../../../backend/src/services/school.service.js";

export default async function handler(req, res) {
    console.log('AAAA')
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication/[ID]");
        try {
            const {id} = req.params;
            const data = await getSchoolCommunicationById(id);
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ error: error.message });
        }
    }
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}