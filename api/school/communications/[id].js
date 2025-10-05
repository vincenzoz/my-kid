import {
    getSchoolCommunicationById, modifySchoolCommunicationById
} from "../../../backend/src/services/school.service.js";

export default async function handlerGetById(req, res) {
    if(req.method === "GET") {
        console.log("[API] GET - /school/communication/[ID]");
        try {
            let id;
            if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                id = req.params.id;
            } else {
                id = req.query.id;
            }
            console.log('id: ' + id);
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: "Invalid ID" });
            }
            const data = await getSchoolCommunicationById(Number(id));
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            }

            const mappedDto = {
                id: data.id,
                title: data.title,
                description: data.description,
                createdAt: data.created_at,
                createdBy: data.created_by,
                important: data.important,
                read: data.read
            }

            return res.status(200).json(mappedDto);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if(req.method === "PUT") {
        console.log("[API] PUT - /school/communication/[ID]");
        try {
            let id;
            if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                id = req.params.id;
            } else {
                id = req.query.id;
            }
            console.log('id: ' + id);
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: "Invalid ID" });
            }

            let requestBody = req.body;
            console.table('body: ' + requestBody);
            if(!requestBody)
                return res.status(400).json({ error: "Invalid request body" });

            const data = await modifySchoolCommunicationById(Number(id), requestBody);
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            }

            const mappedDto = {
                id: data.id,
                title: data.title,
                description: data.description,
                createdAt: data.created_at,
                createdBy: data.created_by,
                important: data.important,
                read: data.read
            }

            return res.status(200).json(mappedDto);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }

    }
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`)
}