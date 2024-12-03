db.createCollection('roles', {
    validator: {
        $jsonSchema: {
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'name is required'
                }
            }
        }
    }
})