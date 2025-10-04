export function createMockClient() {
    return {
        from: (table) => {
            const mockData = [
                { id: 1, title: "Soupe a la courge", description: "Il 23 Dicembre la scuola organizza...", type: "SCHOOL", important: true, created_at: '2025-10-01 11:39:04.31597', created_by: 1, read: false },
                { id: 2, title: "Incontro con i maestri", description: null, type: "SCHOOL", important: true, created_at: '2025-10-02 11:39:04.31597', created_by: 2, read: false },
                { id: 3, title: "Comunication Septembre", description: "Ultimo giorno di scuola sarà il 19.12.2025", type: "SCHOOL", important: true, created_at: '2025-10-03 11:39:04.31597', created_by: 1, read: true }
            ];

            return {
                select: () => {
                    console.log('[MOCK] SELECT school communications');
                    return {
                        data: mockData,
                        eq: (column, value) => {
                            console.log(`[MOCK] Filter by ${column} = ${value}`);
                            const filtered = mockData.filter(item => item[column] === value);
                            return {
                                single: () => {
                                    console.log('[MOCK] Return single item');
                                    return {
                                        data: filtered[0] || null,
                                        error: null
                                    };
                                },
                                data: filtered,
                                error: null
                            };
                        }
                    };
                },
                insert: (table) => {
                    console.log('[MOCK] INSERT school communications');
                    return {
                        select: () => {
                            return {
                                data: {
                                    id: 100,
                                    createdAt: new Date().getTime(),
                                    title: "new title",
                                    description: 'new description',
                                    event: true,
                                    eventTitle: 'event title',
                                    eventDate: '2025-03-01'
                                }
                            }
                        }
                    }
                }
            }

        }
    }

}