export function createMockClient() {
    return {
        from: (table) => ({
            select: () => {
                console.log('[MOCK] SELECT school communications');
                return {
                    data: [
                        {
                            id: 1,
                            title: "Soupe a la courge",
                            description: "Il 23 Dicembre la scuola organizza...",
                            date: '2025-03-01'
                        },
                        {
                            id: 2,
                            title: "Incontro con i meestri",
                            description: null,
                            date: '2027-01-01'
                        },
                        {
                            id: 3,
                            title: "Comunication Septembre",
                            description: "Ultimo giorno di scuola sarà il 19.12.2025",
                        },
                        {
                            id: 4,
                            title: "Comunication 2",
                            description: "",
                            date: undefined
                        },
                        {
                            id: 5,
                            title: "Comunication 3",
                            description: "Bisogna andare entrambi e lasciare figli a casa",
                            date: '2025-03-01'
                        },
                        {
                            id: 6,
                            title: "Comunication 4",
                            description: "Ultimo giorno di scuola sarà il 19.12.2025",
                            date: '2025-03-01'
                        },{
                            id: 7,
                            title: "Comunication 5",
                            description: "",
                            date: '2025-03-01'
                        },{
                            id: 8,
                            title: "Comunication 6",
                            description: "",
                            date: '2025-03-01'
                        },{
                            id: 9,
                            title: "Comunication 7",
                            description: "",
                            date: '2025-03-01'
                        },{
                            id: 10,
                            title: "Comunication 8",
                            description: "",
                            date: '2025-03-01'
                        },{
                            id: 11,
                            title: "Comunication 9",
                            description: "",
                            date: '2025-03-01'
                        }
                    ]
                };
            },
            insert: (table) => {
                console.log('[MOCK] INSERT school communications');
                return {
                    data: {
                        id: 100,
                        title: "new title",
                        description: 'new description',
                        event: true,
                        eventTitle: 'event title',
                        eventDate: '2025-03-01'
                    }
                }
            }
        })
    }

}