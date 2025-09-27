// api/users.js
import { getUsers } from "../backend/src/services/user.service.js";

export default function handler(req, res) {
    console.log(process.env.testA);

    console.log("get user api");
    console.log(req.body);
//     const users = [
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' }
//     ];

    getUsers()
        .then(users => {
            console.log('hey ' + users);
        }).catch(err => {console.log('erroraa: ' + err)});
    res.status(200).json([]);
}