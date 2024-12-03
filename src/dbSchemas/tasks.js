db.createCollection('tasks', {
    validator: {
        $jsonSchema: {
            required: ['title', 'description'],
            properties: {
                title: {
                    bsonType: 'string',
                    description: 'title is required'
                },
                description: {
                    bsonType: 'string',
                    description: 'description is required'
                }

            }
        }
    }
});