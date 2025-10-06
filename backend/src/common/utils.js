
export function isDevEnvironment() {
    return process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';
}