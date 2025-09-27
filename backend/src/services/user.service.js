// @ts-ignore
import {DbService} from "../common/database-utils.js";


/**
 * Get all users
 */
export async function getUsers() {
    console.debug('Getting users');
    const data = await DbService.getData("school_communications")
    return data;
}

