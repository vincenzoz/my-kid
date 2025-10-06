export function buildCommunicationDto(data) {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        createdAt: data.created_at,
        createdBy: data.created_by,
        important: data.important,
        read: data.read
    }
}