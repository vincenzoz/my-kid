// api/users.js
import { getUsers } from "dist/backend/services/UserService.d.ts";

export default function handler(req, res) {
    console.log("get user api");
    console.log(req.body);
//     const users = [
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' }
//     ];

    const users = getUsers();

    res.status(200).json(users);
}