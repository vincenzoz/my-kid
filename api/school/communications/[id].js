import {
    deleteSchoolCommunicationById,
    getSchoolCommunicationById, modifySchoolCommunicationById
} from "../../../backend/src/services/school.service.js";
import {isDevEnvironment} from "../../../backend/src/common/utils.js";
import {buildCommunicationDto} from "../../../backend/src/common/model-mapper.js";

export default async function handlerGetById(req, res) {
    console.log('[API] ' + req.method + ' - /school/communication/[ID]');
    try {
        if (req.method === "GET" || req.method === "PUT" || req.method === "DELETE") {
            const id = isDevEnvironment() ? req.params.id : req.query.id;
            console.log('id: ' + id);

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({error: "Invalid ID"});
            }
            let data;
            if (req.method === "GET") {
                data = await getSchoolCommunicationById(Number(id));
                if (!data) {
                    return res.status(404).json({error: "Data not found"});
                }
            }
            if (req.method === "PUT") {
                let requestBody = req.body;
                console.table('body: ' + requestBody);
                if (!requestBody)
                    return res.status(400).json({error: "Invalid request body"});
                data = await modifySchoolCommunicationById(Number(id), requestBody);
                if (!data) {
                    return res.status(404).json({error: "Data not found"});
                }
            }
            if (req.method === "DELETE") {
                data = await deleteSchoolCommunicationById(Number(id));
                if (!data) {
                    return res.status(404).json({error: "Data not found"});
                }
            }
            return res.status(200).json(buildCommunicationDto(data));
        }
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}