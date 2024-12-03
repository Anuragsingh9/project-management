db.createCollection('projects', {
    validator: {
        $jsonSchema: {
            required: ['name', 'org_id'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'name is required'
                },
                org_id: {
                    bsonType: 'string',
                    description: 'org_id is required'
                }

            }
        }
    }
});