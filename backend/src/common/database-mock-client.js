
export function createMockClient() {
    return {
        from: (table) => ({
            select: () => {
                console.log('[MOCK] SELECT * FROM ${table}');
                return {data: [{id: 1, date: '2025-03-01'}]};
            }
        })
    }

}