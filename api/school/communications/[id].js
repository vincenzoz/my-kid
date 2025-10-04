import {
    getSchoolCommunicationById
} from "../../../backend/src/services/school.service.js";

export default async function handlerGetById(req, res) {
    console.log('AAAA')
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication/[ID]");
        try {
            console.log('before');
            const id = req.query.id;
            console.log('after: ' + id);
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: "Invalid ID" });
            }
            const data = await getSchoolCommunicationById(Number(id));
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            }
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`)
}