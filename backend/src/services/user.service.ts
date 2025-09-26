// @ts-ignore
import {DbService} from "../common/database-utils.ts";

export interface User {
    id: number;
    name: string;
    email?: string | undefined;
}

// Sample in-memory user data
const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie' },
];

// Service functions

/**
 * Get all users
 */
export async function getUsers(): Promise<any> {
    console.debug('Getting users');
    let users: User[] = [];
    const data = await DbService.getData("school_communications")
    return data;
}

/**
 * Get a user by ID
 */
export function getUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
}

/**
 * Add a new user
 */
export function addUser(name: string, email?: string): User {
    const newUser: User = {
        id: users.length + 1,
        name,
        email,
    };
    users.push(newUser);
    return newUser;
}

/**
 * Delete a user by ID
 */
export function deleteUser(id: number): boolean {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}
